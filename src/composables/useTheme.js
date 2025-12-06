import { ref, watch } from 'vue'

// Global reactive state (singleton)
const theme = ref(localStorage.getItem('theme') || 'dark')

// Initialize theme on first load
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  }

  console.log('🎨 [useTheme] Initializing theme:', theme.value)

  // Apply theme immediately
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
    console.log('🌙 [useTheme] Applied dark class to HTML')
  } else {
    document.documentElement.classList.remove('dark')
    console.log('☀️ [useTheme] Removed dark class from HTML')
  }
}

// Watch for theme changes
watch(
  theme,
  (newTheme) => {
    console.log('🔄 [useTheme] Theme changed to:', newTheme)
    localStorage.setItem('theme', newTheme)

    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      console.log('🌙 [useTheme] Applied dark class')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('☀️ [useTheme] Removed dark class')
    }

    // Log current HTML classes
    console.log('📋 [useTheme] HTML classes:', document.documentElement.className)
  },
  { immediate: false },
)

// Initialize on module load
initTheme()

export function useTheme() {
  const toggleTheme = () => {
    console.log('🔀 [useTheme] Toggle clicked, current theme:', theme.value)
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const setTheme = (newTheme) => {
    console.log('⚙️ [useTheme] SetTheme called with:', newTheme)
    theme.value = newTheme
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: () => theme.value === 'dark',
  }
}
