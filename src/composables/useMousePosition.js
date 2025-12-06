import { ref } from 'vue'

export function useMousePosition() {
  const mouseX = ref(0)
  const mouseY = ref(0)

  const handleMove = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }

  return {
    mouseX,
    mouseY,
    handleMove,
  }
}
