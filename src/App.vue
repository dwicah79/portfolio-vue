<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroComponent from './components/HeroComponent.vue'
import AboutSection from './components/sections/About.vue'
import GithubActivity from './components/sections/GithubActivity.vue'
import Experience from './components/sections/Experience.vue'
import Contact from './components/sections/Contact.vue'
import Footer from './components/sections/Footer.vue'
import { useTheme } from '@/composables/useTheme'
import { useMousePosition } from '@/composables/useMousePosition'

useTheme()

const { mouseX, mouseY, handleMove } = useMousePosition()

/* =======================
   GLOBAL SCROLL PROGRESS
======================= */
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  const scrollable = documentHeight - windowHeight
  scrollProgress.value = scrollable > 0 ? scrollTop / scrollable : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="overflow-hidden relative" @mousemove="handleMove">
    <Motion
      class="fixed top-0 left-0 right-0 h-1 origin-left z-[9999] bg-black dark:bg-white"
      :style="{ scaleX: scrollProgress }"
      :animate="{ opacity: [0.6, 1, 0.6] }"
      :transition="{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }"
    />

    <!-- Cursor glow -->
    <div
      class="w-[150px] h-[150px] fixed pointer-events-none rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen z-[9998] transition-all duration-75 ease-out"
      style="background: radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent 70%)"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    />

    <HeroComponent />
    <AboutSection />
    <Experience />
    <GithubActivity />
    <Contact />
    <Footer />
  </div>
</template>
