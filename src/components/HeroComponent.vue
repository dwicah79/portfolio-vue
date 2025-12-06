<script setup>
import { ref } from 'vue'
import { Github, Instagram, Linkedin, Menu, X } from 'lucide-vue-next'

const mouseX = ref(0)
const mouseY = ref(0)
const isSidebarOpen = ref(false)

const handleMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const menuItems = [
  { name: 'Home', link: '#' },
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Contact', link: '#contact' },
]

const socialLinks = [
  { icon: Github, url: 'https://github.com/dwicah79', delay: 0 },
  { icon: Instagram, url: 'https://instagram.com/dwicah79', delay: 0.2 },
  { icon: Linkedin, url: 'https://linkedin.com/in/dwicah79', delay: 0.4 },
]
</script>

<template>
  <header
    class="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden"
    @mousemove="handleMove"
  >
    <div
      class="w-[150px] h-[150px] fixed pointer-events-none rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen z-2"
      style="background: radial-gradient(circle, rgba(0, 255, 255, 0.3), rgba(0, 255, 255, 0) 70%)"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    />

    <Motion
      class="fixed top-8 right-8 z-30"
      :initial="{ scale: 0, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{
        duration: 0.5,
        delay: 2,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }"
    >
      <button
        @click="toggleSidebar"
        class="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 hover:border-white hover:bg-white hover:scale-110 group"
      >
        <Menu
          :size="28"
          class="text-white/70 group-hover:text-black group-hover:cursor-pointer transition-colors duration-300"
        />
      </button>
    </Motion>

    <Transition
      enter-active-class="transition-transform duration-500 ease-out"
      leave-active-class="transition-transform duration-500 ease-in"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isSidebarOpen"
        class="fixed top-0 right-0 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 h-screen bg-linear-to-br from-slate-900 via-black to-slate-900 z-40 shadow-2xl overflow-y-auto"
      >
        <button
          @click="toggleSidebar"
          class="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:rotate-90 group z-50"
        >
          <X
            :size="20"
            class="md:w-6 md:h-6 text-white/70 group-hover:text-white group-hover:cursor-pointer transition-colors duration-300"
          />
        </button>

        <div
          class="flex flex-col justify-center min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-0"
        >
          <div class="mb-8 md:mb-16">
            <h2
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-4"
            >
              Navigation
            </h2>
            <div
              class="w-32 sm:w-40 md:w-52 h-0.5 md:h-1 bg-linear-to-r from-gray-400 to-gray-300"
            ></div>
          </div>

          <nav class="space-y-1 md:space-y-2">
            <Motion
              v-for="(item, index) in menuItems"
              :key="index"
              :initial="{ x: 100, opacity: 0 }"
              :animate="isSidebarOpen ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }"
              :transition="{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 20,
              }"
            >
              <a
                :href="item.link"
                class="group block relative overflow-hidden rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 transition-all duration-300"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="text-2xl sm:text-3xl md:text-4xl font-bold text-white/60 group-hover:text-white transition-colors duration-300"
                  >
                    {{ item.name }}
                  </span>
                  <span
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white/5 group-hover:text-white transition-all duration-300 group-hover:translate-x-2"
                  >
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                </div>
                <div
                  class="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"
                ></div>
              </a>
            </Motion>
          </nav>

          <div class="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
            <p class="text-white/40 text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wider">
              Follow Me
            </p>
            <div class="flex gap-3 md:gap-4">
              <a
                v-for="(social, index) in socialLinks"
                :key="index"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-sky-400/20 hover:border-sky-400 hover:scale-110"
              >
                <component
                  :is="social.icon"
                  :size="16"
                  class="md:w-[18px] md:h-[18px] text-white/50 hover:text-sky-400 transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-opacity duration-500"
      leave-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
      ></div>
    </Transition>

    <div class="relative z-10 flex items-center justify-center w-full px-4">
      <Motion
        class="absolute inset-0 flex items-center justify-center"
        :initial="{ y: -500, opacity: 0, rotate: 12 }"
        :animate="{ y: 0, opacity: 0.3, rotate: 12 }"
        :transition="{
          duration: 1,
          delay: 0.5,
          type: 'spring',
          stiffness: 80,
          damping: 15,
        }"
      >
        <div
          class="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-3xl transform overflow-hidden shadow-lg shadow-sky-300 border-2 border-sky-300"
        >
          <img
            src="/src/assets/images/avatar.jpeg"
            alt="background"
            class="w-full h-full object-cover"
          />
        </div>
      </Motion>

      <div class="relative w-full flex items-center justify-center">
        <h1
          class="font-bebas text-[80px] md:text-[120px] lg:text-[180px] leading-[0.85] text-white font-bold text-left"
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
            <span class="block">Fullstack</span>
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
            <span>DEVELOPER</span>
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
        <h2 class="text-white font-bold uppercase text-2xl md:text-5xl font-bebas tracking-wide">
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
            class="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 hover:border-sky-400 hover:bg-sky-400/20 hover:scale-110 group"
          >
            <component
              :is="social.icon"
              :size="24"
              class="text-white/70 group-hover:text-sky-400 transition-colors duration-300"
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
