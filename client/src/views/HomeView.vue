<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold text-center mb-8">YouTube Downloader</h1>
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Enter YouTube URL</label>
          <input
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg w-full">Download</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home view component logic
</script>
