const express = require('express')
const ytdl = require('@distube/ytdl-core')
const router = express.Router()

// Get video info
router.get('/info', async (req, res) => {
  try {
    const { url } = req.query

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' })
    }

    console.log('--- Start get data from url: ', url)

    const info = await ytdl.getInfo(url, { playerClients: ['WEB'] })

    // Filter for high quality formats only
    const highQualityFormats = info.formats.filter((format) => {
      // Include high quality video formats (720p and above)
      if (format.qualityLabel) {
        const resolution = parseInt(format.qualityLabel.split('p')[0], 10)
        return resolution >= 720
      }

      // Include high quality audio formats
      if (format.audioQuality) {
        return (
          format.audioQuality.includes('AUDIO_QUALITY_MEDIUM') || format.audioQuality.includes('AUDIO_QUALITY_HIGH')
        )
      }

      return false
    })

    // Add audio-only option if available
    const audioOnlyFormats = info.formats.filter(
      (format) => !format.qualityLabel && format.audioQuality && format.container === 'mp4'
    )

    if (audioOnlyFormats.length > 0) {
      // Get highest quality audio
      const bestAudio = audioOnlyFormats.reduce((prev, current) => {
        if (!prev) return current

        const prevQuality = prev.audioQuality || ''
        const currentQuality = current.audioQuality || ''

        if (currentQuality.includes('HIGH') && !prevQuality.includes('HIGH')) {
          return current
        }

        return prev
      }, null)

      if (bestAudio) {
        highQualityFormats.push(bestAudio)
      }
    }

    // Return filtered formats
    const filteredInfo = {
      ...info,
      formats: highQualityFormats
    }

    return res.json(filteredInfo)
  } catch (error) {
    console.error('Error fetching video info:', error)
    return res.status(500).json({ error: 'Failed to fetch video information' })
  }
})

// Download video
router.get('/download', async (req, res) => {
  try {
    const { url, itag } = req.query

    if (!url || !itag) {
      return res.status(400).json({ error: 'URL and itag are required' })
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' })
    }

    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { quality: itag })

    if (!format) {
      return res.status(400).json({ error: 'Format not available' })
    }

    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '')
    const fileExtension = format.container || 'mp4'

    res.header('Content-Disposition', `attachment; filename="${videoTitle}.${fileExtension}"`)
    res.header('Content-Type', format.mimeType || 'video/mp4')

    ytdl(url, { format }).pipe(res)
  } catch (error) {
    console.error('Error downloading video:', error)
    return res.status(500).json({ error: 'Failed to download video' })
  }
})

module.exports = router
