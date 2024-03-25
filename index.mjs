import youtubedl from 'youtube-dl-exec'
import progressEstimator from 'progress-estimator'

const playlist = 'https://www.youtube.com/watch?v=VhAuktOmS9I'

// result = result.formats.filter(item => item.resolution && item.filesize)

async function downloadPlaylist(playlistUrl = null) {
  try {

    if(!playlistUrl) return ''
  
    console.log("Start get video info")
    const promise = youtubedl(playlistUrl, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
      simulate: true,
      noCacheDir: true
    })
  
    const logger = progressEstimator();
  
    let result = await logger(promise, `Obtaining data from ${playlistUrl}`)
  
    const config = {
      extractAudio: true, 
      ffmpegLocation: './libs/ffmpeg', 
      audioFormat: 'mp3',
      output: './resource/%(title)s.mp3'
    }
    
    
    result.entries.forEach(item => {
      youtubedl.exec(item.webpage_url, config)
      console.log(`Start download video ${item.title}`);
    });
    
    console.log("------------- Total record download: " + result.entries.length + ' -------------');
  } catch(e) {
    console.log(e.stderr);
  }
}

downloadPlaylist('https://www.youtube.com/playlist?list=PL0FK5hYgy-UHix6fkhDyC-HzWS5nAdo4s')