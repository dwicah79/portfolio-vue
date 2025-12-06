<script setup>
import HeroComponent from './components/HeroComponent.vue'
import AboutSection from './components/sections/About.vue'
import { useTheme } from '@/composables/useTheme'

// Initialize theme to apply dark/light mode on mount
useTheme()
</script>

<template>
  <div class="overflow-hidden">
    <HeroComponent />
    <AboutSection />
  </div>
</template>

<style scoped></style>
