<script setup>
import { computed } from 'vue'
import { Github, Instagram, Linkedin } from 'lucide-vue-next'
import NavBar from './NavBar.vue'
import { useMousePosition } from '@/composables/useMousePosition'
import { useLanguage } from '@/composables/useLanguage'
import { useTheme } from '@/composables/useTheme'
import { SOCIAL_LINKS } from '@/constants'
import { getTranslation } from '@/constants/translations'

// Composables
const { mouseX, mouseY, handleMove } = useMousePosition()
const { locale } = useLanguage()
const { theme } = useTheme()

// Translation helper
const t = (key) => computed(() => getTranslation(locale.value, key))

// Dynamic opacity based on theme
const imageOpacity = computed(() => (theme.value === 'dark' ? 0.3 : 1))

// Map social icons
const socialLinks = SOCIAL_LINKS.map((link) => ({
  ...link,
  icon: link.name === 'Github' ? Github : link.name === 'Instagram' ? Instagram : Linkedin,
}))
</script>

<template>
  <header
    class="w-screen h-screen bg-white dark:bg-black flex items-center justify-center relative overflow-hidden"
    @mousemove="handleMove"
  >
    <div
      class="w-[150px] h-[150px] fixed pointer-events-none rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen z-2"
      style="background: radial-gradient(circle, rgba(0, 255, 255, 0.3), rgba(0, 255, 255, 0) 70%)"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    />

    <NavBar />

    <div class="relative z-10 flex items-center justify-center w-full px-4">
      <Motion
        class="absolute inset-0 flex items-center justify-center"
        :initial="{ y: -500, opacity: 0, rotate: 12 }"
        :animate="{ y: 0, opacity: imageOpacity, rotate: 12 }"
        :transition="{
          duration: 1,
          delay: 0.5,
          type: 'spring',
          stiffness: 80,
          damping: 15,
        }"
      >
        <div
          class="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-3xl transform overflow-hidden shadow-lg shadow-black dark:shadow-sky-300 border-2 border-black dark:border-sky-300 transition-all duration-300 relative"
        >
          <img
            src="/src/assets/images/avatar.jpeg"
            alt="background"
            class="w-full h-full object-cover"
          />
          <!-- Dark overlay for light mode -->
          <div
            class="absolute inset-0 bg-black/40 dark:bg-transparent transition-all duration-300"
          ></div>
        </div>
      </Motion>

      <div class="relative w-full flex items-center justify-center">
        <h1
          class="font-bebas text-[80px] md:text-[120px] lg:text-[180px] leading-[0.85] text-black dark:text-white font-bold text-left"
        >
          <Motion
            :initial="{ x: -500, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{
              duration: 0.8,
              delay: 0,
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }"
          >
            <span class="block">{{ t('hero.fullstack').value }}</span>
          </Motion>

          <br />

          <Motion
            class="inline-block ml-[1em] md:ml-[3em] lg:ml-[5em]"
            :initial="{ x: 500, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{
              duration: 0.8,
              delay: 1.2,
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }"
          >
            <span>{{ t('hero.developer').value }}</span>
          </Motion>
        </h1>
      </div>
    </div>

    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6">
      <Motion
        :initial="{ y: 100, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{
          duration: 0.8,
          delay: 1.5,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }"
      >
        <h2
          class="text-black font-bold uppercase dark:text-white text-2xl md:text-5xl font-bebas tracking-wide"
        >
          Dwi Cahyo Nugroho
        </h2>
      </Motion>

      <div class="flex gap-4">
        <Motion
          v-for="(social, index) in socialLinks"
          :key="index"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{
            duration: 0.5,
            delay: 1.8 + social.delay,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }"
        >
          <a
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-12 h-12 rounded-full border-2 border-black dark:border-white/30 flex items-center justify-center transition-all duration-300 dark:hover:border-sky-400 dark:hover:bg-sky-400/20 hover:scale-110 group"
          >
            <component
              :is="social.icon"
              :size="24"
              class="text-black dark:text-white/70 group-hover:text-black dark:group-hover:text-sky-400 transition-colors duration-300"
            />
          </a>
        </Motion>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
