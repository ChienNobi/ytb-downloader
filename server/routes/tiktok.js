const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const router = express.Router()

// Get TikTok video info
router.get('/info', async (req, res) => {
  try {
    const { url } = req.query

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    // Validate TikTok URL format
    const tiktokRegex = /https?:\/\/(www\.|vm\.)?tiktok\.com\/.+/i
    if (!tiktokRegex.test(url)) {
      return res.status(400).json({ error: 'Invalid TikTok URL' })
    }

    // Use a third-party API to get TikTok video info
    const response = await axios.get('https://api.tikwm.com/api', {
      params: { url },
      timeout: 10000
    })

    if (response.data.code !== 0) {
      throw new Error('Failed to fetch video info')
    }

    // Format response for UI consumption
    const videoData = response.data.data
    return res.json({
      success: true,
      videoDetails: {
        id: videoData.id,
        title: videoData.title,
        author: {
          name: videoData.author.nickname,
          uniqueId: videoData.author.unique_id
        },
        duration: videoData.duration,
        thumbnails: [
          {
            url: videoData.cover,
            width: 720,
            height: 1280
          }
        ]
      },
      formats: [
        {
          itag: 'nowm',
          qualityLabel: 'No Watermark',
          container: 'mp4',
          url: videoData.play
        },
        {
          itag: 'wm',
          qualityLabel: 'With Watermark',
          container: 'mp4',
          url: videoData.wmplay
        },
        {
          itag: 'audio',
          qualityLabel: 'Audio Only',
          container: 'mp3',
          url: videoData.music
        }
      ]
    })
  } catch (error) {
    console.error('Error fetching TikTok video info:', error)
    return res.status(500).json({ error: 'Failed to fetch TikTok video information' })
  }
})

// Download TikTok video
router.get('/download', async (req, res) => {
  try {
    const { url, itag } = req.query

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    if (!itag || !['nowm', 'wm', 'audio'].includes(itag)) {
      return res.status(400).json({ error: 'Valid itag is required (nowm, wm, or audio)' })
    }

    // Get video info first to get download URLs
    const response = await axios.get('https://api.tikwm.com/api', {
      params: { url },
      timeout: 10000
    })

    if (response.data.code !== 0) {
      throw new Error('Failed to fetch video info')
    }

    let downloadUrl = ''
    let filename = ''
    let contentType = ''
    const data = response.data.data
    const sanitizedTitle = data.title.replace(/[^\w\s]/gi, '') || 'tiktok_video'

    // Select the correct URL based on the requested type
    if (itag === 'nowm') {
      downloadUrl = data.play
      filename = `${sanitizedTitle}_no_watermark.mp4`
      contentType = 'video/mp4'
    } else if (itag === 'wm') {
      downloadUrl = data.wmplay
      filename = `${sanitizedTitle}_with_watermark.mp4`
      contentType = 'video/mp4'
    } else if (itag === 'audio') {
      downloadUrl = data.music
      filename = `${sanitizedTitle}_audio.mp3`
      contentType = 'audio/mpeg'
    }

    if (!downloadUrl) {
      return res.status(400).json({ error: 'Requested format not available' })
    }

    // Set response headers
    res.header('Content-Disposition', `attachment; filename="${filename}"`)
    res.header('Content-Type', contentType)

    // Stream the video to the client
    const videoResponse = await axios({
      method: 'GET',
      url: downloadUrl,
      responseType: 'stream'
    })

    videoResponse.data.pipe(res)
  } catch (error) {
    console.error('Error downloading TikTok video:', error)
    return res.status(500).json({ error: 'Failed to download TikTok video' })
  }
})

module.exports = router
