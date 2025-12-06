import { ref, watch } from 'vue'

export function useLanguage() {
  const locale = ref(localStorage.getItem('locale') || 'id')

  const toggleLanguage = () => {
    locale.value = locale.value === 'id' ? 'en' : 'id'
  }

  const setLanguage = (lang) => {
    locale.value = lang
  }

  // Watch untuk update localStorage
  watch(
    locale,
    (newLocale) => {
      localStorage.setItem('locale', newLocale)
    },
    { immediate: true },
  )

  return {
    locale,
    toggleLanguage,
    setLanguage,
    isIndonesian: () => locale.value === 'id',
    isEnglish: () => locale.value === 'en',
  }
}
