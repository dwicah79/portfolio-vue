import { ref, watch } from 'vue'

// Global shared state (singleton pattern)
const locale = ref(localStorage.getItem('locale') || 'id')

// Watch untuk update localStorage
watch(
  locale,
  (newLocale) => {
    localStorage.setItem('locale', newLocale)
  },
  { immediate: true },
)

export function useLanguage() {
  const toggleLanguage = () => {
    locale.value = locale.value === 'id' ? 'en' : 'id'
  }

  const setLanguage = (lang) => {
    locale.value = lang
  }

  return {
    locale,
    toggleLanguage,
    setLanguage,
    isIndonesian: () => locale.value === 'id',
    isEnglish: () => locale.value === 'en',
  }
}
