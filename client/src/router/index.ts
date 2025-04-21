import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
import YoutubeDownloader from '@/views/YoutubeDownloader.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'youtube',
    component: YoutubeDownloader,
    meta: {
      title: 'YouTube Downloader'
    }
  },
  {
    path: '/tiktok',
    name: 'tiktok',
    component: () => import('@/views/TiktokDownloader.vue'),
    meta: {
      title: 'TikTok Downloader'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title based on route
router.beforeEach((to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
  document.title = `${to.meta.title || 'Media Downloader'}`
  next()
})

export default router
