<script setup>
import HeroComponent from './components/HeroComponent.vue'
import { useTheme } from '@/composables/useTheme'

// Initialize theme to apply dark/light mode on mount
useTheme()
</script>

<template>
  <HeroComponent />
</template>

<style scoped></style>
