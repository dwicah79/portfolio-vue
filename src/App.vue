<script setup>
import HeroComponent from './components/HeroComponent.vue'
import AboutSection from './components/sections/About.vue'
import GithubActivity from './components/sections/GithubActivity.vue'
import Experience from './components/sections/Experience.vue'
import { useTheme } from '@/composables/useTheme'
import { useMousePosition } from '@/composables/useMousePosition'

// Initialize theme to apply dark/light mode on mount
useTheme()

// Mouse position for cursor glow effect
const { mouseX, mouseY, handleMove } = useMousePosition()
</script>

<template>
  <div class="overflow-hidden relative" @mousemove="handleMove">
    <!-- Global cursor glow effect -->
    <div
      class="w-[150px] h-[150px] fixed pointer-events-none rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen z-[9999] transition-all duration-75 ease-out"
      style="background: radial-gradient(circle, rgba(0, 255, 255, 0.3), rgba(0, 255, 255, 0) 70%)"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    />

    <HeroComponent />
    <AboutSection />
    <GithubActivity />
    <Experience />
  </div>
</template>

<style scoped></style>
