<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-8">YouTube Downloader</h1>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Enter YouTube URL</label>
        <el-input
          v-model="youtubeUrl"
          type="text"
          class="w-full"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>
      <el-button
        @click="downloadVideo"
        class="w-full flex items-center justify-center"
        :disabled="isLoading"
        type="primary"
        :loading="isLoading"
      >
        <span>{{ isLoading ? 'Processing...' : 'Download' }}</span>
      </el-button>

      <!-- Video Info Section -->
      <div v-if="videoInfo" class="mt-6 p-4 border rounded-lg">
        <div class="flex flex-col gap-4">
          <img
            v-if="videoInfo.thumbnail"
            :src="videoInfo.thumbnail"
            class="w-full rounded-md"
            alt="Video thumbnail"
          />
          <div>
            <h2 class="font-bold text-lg">{{ videoInfo.title }}</h2>
            <p class="text-gray-600">{{ videoInfo.duration }}</p>
            <div class="mt-4 space-y-2">
              <el-tag
                v-for="format in downloadFormats"
                :key="format.id"
                @click="downloadFormat(format.id)"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md mr-2 mb-2 cursor-pointer"
              >
                {{ format.label }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import {ElMessage} from "element-plus";

interface VideoFormat {
  id: string
  itag: string
  label: string
}

interface YoutubeVideoInfo {
  title: string
  duration: string
  thumbnail: string
}

const API_URL = 'http://localhost:8000/api/youtube'
const youtubeUrl = ref('')
const isLoading = ref(false)
const videoInfo = ref<YoutubeVideoInfo | null>(null)
const downloadFormats = ref<VideoFormat[]>([])
const error = ref('')

const downloadVideo = async () => {
  if (!youtubeUrl.value) return

  isLoading.value = true
  error.value = ''

  try {
    // Call the YouTube API to get video info
    const response = await axios.get(`${API_URL}/info`, {
      params: { url: youtubeUrl.value }
    })

    const videoData = response.data

    // Extract video details
    videoInfo.value = {
      title: videoData.videoDetails.title,
      duration: formatDuration(videoData.videoDetails.lengthSeconds),
      thumbnail: videoData.videoDetails.thumbnails[videoData.videoDetails.thumbnails.length - 1].url
    }

    console.log(videoData)

    // Extract available formats
    downloadFormats.value = videoData.formats
      .filter((format: any) => format.qualityLabel || format.audioQuality)
      .map((format: any) => ({
        id: format.itag,
        label: format.qualityLabel
          ? `${format.qualityLabel} (${format.container})`
          : `Audio Only (${format.container || 'mp4'})`
      }))
  } catch (error: any) {
    console.log(error)
    ElMessage({
      message: error.response?.data?.error || 'Failed to fetch video information',
      type: 'error',
      duration: 5000
    })
  } finally {
    isLoading.value = false
  }
}

const downloadFormat = (formatId: string) => {
  if (!youtubeUrl.value) return

  // Open download URL in a new tab
  const downloadUrl = `${API_URL}/download?url=${encodeURIComponent(youtubeUrl.value)}&itag=${formatId}`
  window.open(downloadUrl, '_blank')
}

const formatDuration = (seconds: string | number) => {
  const totalSeconds = Number(seconds)
  if (isNaN(totalSeconds)) return '0:00'

  const minutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const remainingSeconds = Math.floor(totalSeconds % 60)

  if (hours > 0) {
    return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>
