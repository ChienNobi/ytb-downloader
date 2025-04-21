<template>
  <nav class="bg-gray-800 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <!-- Logo -->
          <div class="flex items-center py-4">
            <span class="font-bold text-xl">Media Downloader</span>
          </div>

          <!-- Primary Nav -->
          <div class="hidden md:flex items-center space-x-1">
            <router-link
              to="/"
              class="py-4 px-3 hover:bg-gray-700 transition duration-300"
              :class="{ 'bg-gray-700': $route.path === '/' || $route.path.includes('/youtube') }"
            >
              YouTube Downloader
            </router-link>
            <router-link
              to="/tiktok"
              class="py-4 px-3 hover:bg-gray-700 transition duration-300"
              :class="{ 'bg-gray-700': $route.path.includes('/tiktok') }"
            >
              TikTok Downloader
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMobileMenu" class="mobile-menu-button p-2 focus:outline-none">
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden" :class="{ hidden: !mobileMenuOpen }">
      <router-link
        to="/"
        class="block py-3 px-4 hover:bg-gray-700"
        :class="{ 'bg-gray-700': $route.path === '/' || $route.path.includes('/youtube') }"
        @click="mobileMenuOpen = false"
      >
        YouTube Downloader
      </router-link>
      <router-link
        to="/tiktok"
        class="block py-3 px-4 hover:bg-gray-700"
        :class="{ 'bg-gray-700': $route.path.includes('/tiktok') }"
        @click="mobileMenuOpen = false"
      >
        TikTok Downloader
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
