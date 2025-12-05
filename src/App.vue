<script setup>
import { motion } from 'motion-v'
import { ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const handleMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}
</script>

<template>
  <div class="wrapper" @mousemove="handleMove">
    <motion.div class="cursor-glow" :style="{ left: mouseX + 'px', top: mouseY + 'px' }" />
    <motion.div
      drag
      :dragConstraints="{ top: -350, left: -660, right: 660, bottom: 350 }"
      class="box"
      :transition="{ duration: 4, repeat: Infinity, ease: 'linear' }"
    >
      <img src="/src/assets/images/avatar.jpeg" alt="avatar" draggable="false" />
    </motion.div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Futuristic Glow Cursor */
.cursor-glow {
  width: 150px;
  height: 150px;
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.5), rgba(0, 255, 255, 0) 70%);
  filter: blur(40px);
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  z-index: 2;
}

.box {
  width: 160px;
  height: 160px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: grab;
  z-index: 10;
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
  border: 2px solid rgba(0, 255, 255, 0.3);
  transition: box-shadow 0.2s ease;
}

.box:active {
  cursor: grabbing;
  box-shadow: 0 0 60px rgba(0, 255, 255, 0.7);
}

.box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
