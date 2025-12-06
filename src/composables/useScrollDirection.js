import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollDirection() {
  const scrollY = ref(0)
  const lastScrollY = ref(0)
  const scrollDirection = ref('down') // 'up' or 'down'
  const scrollProgress = ref(0) // 0 to 1

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    // Determine scroll direction
    if (currentScrollY > lastScrollY.value) {
      scrollDirection.value = 'down'
    } else if (currentScrollY < lastScrollY.value) {
      scrollDirection.value = 'up'
    }

    scrollY.value = currentScrollY
    lastScrollY.value = currentScrollY

    // Calculate scroll progress (0 to 1)
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    scrollProgress.value = currentScrollY / (documentHeight - windowHeight)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    scrollY,
    scrollDirection,
    scrollProgress,
  }
}
