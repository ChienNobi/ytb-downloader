<template>
  <div class="app min-h-screen bg-gray-100">
    <Navbar />
    <main class="container mx-auto py-6 px-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>
