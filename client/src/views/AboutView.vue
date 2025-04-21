<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold text-center mb-8">About This App</h1>
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <p class="text-gray-700">
          This is a YouTube video downloader built with Vue 3, TypeScript, and Tailwind CSS. It allows you to download
          videos from YouTube in various formats and qualities.
        </p>
        <div class="mt-6">
          <router-link
            to="/"
            class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About view component logic
</script>
