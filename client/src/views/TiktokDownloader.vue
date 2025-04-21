<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-8">TikTok Downloader</h1>
    <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Enter TikTok URL</label>
        <input
          v-model="tiktokUrl"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="https://www.tiktok.com/@username/video/@id"
        />
      </div>
      <button
        @click="downloadVideo"
        class="bg-black hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-lg w-full flex items-center justify-center"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="mr-2">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
        <span>{{ isLoading ? 'Processing...' : 'Download' }}</span>
      </button>

      <!-- Video Info Section -->
      <div v-if="videoInfo" class="mt-6 p-4 border rounded-lg">
        <div class="flex flex-col md:flex-row gap-4">
          <img
            v-if="videoInfo.thumbnail"
            :src="videoInfo.thumbnail"
            class="w-full md:w-48 rounded-md"
            alt="Video thumbnail"
          />
          <div>
            <h2 class="font-bold text-lg">{{ videoInfo.title }}</h2>
            <p class="text-gray-600">By: {{ videoInfo.author }}</p>
            <div class="mt-4 space-y-2">
              <button
                @click="downloadWithoutWatermark"
                class="bg-pink-500 hover:bg-pink-600 text-white font-medium py-1 px-3 rounded-md mr-2"
              >
                Download without watermark
              </button>
              <button
                @click="downloadWithWatermark"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md"
              >
                Download with watermark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TikTokVideoInfo } from '@/utils/type'
import { ref } from 'vue'

const tiktokUrl = ref('')
const isLoading = ref(false)
const videoInfo = ref<TikTokVideoInfo | null>(null)

const downloadVideo = async () => {
  if (!tiktokUrl.value) return

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate video info (would be replaced with actual API call)
    videoInfo.value = {
      title: 'Sample TikTok Video',
      author: '@sampleuser',
      thumbnail: 'https://via.placeholder.com/480x852'
    }
  } catch (error) {
    console.error('Error fetching video:', error)
  } finally {
    isLoading.value = false
  }
}

const downloadWithoutWatermark = () => {
  console.log('Downloading without watermark')
  // Implementation would connect to your backend
}

const downloadWithWatermark = () => {
  console.log('Downloading with watermark')
  // Implementation would connect to your backend
}
</script>
