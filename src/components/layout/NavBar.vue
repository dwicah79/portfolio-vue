<script setup>
import { Menu, X, Github, Instagram, Linkedin } from 'lucide-vue-next'
import { useSidebar } from '@/composables/useSidebar'
import { MENU_ITEMS, SOCIAL_LINKS, ANIMATION_CONFIG } from '@/constants'

// Composable
const { isSidebarOpen, toggleSidebar } = useSidebar()

// Map social icons
const socialLinksWithIcons = SOCIAL_LINKS.map((link) => ({
  ...link,
  icon: link.name === 'Github' ? Github : link.name === 'Instagram' ? Instagram : Linkedin,
}))
</script>

<template>
  <!-- Hamburger Menu Button -->
  <Motion class="fixed top-8 right-8 z-30" v-bind="ANIMATION_CONFIG.hamburger">
    <button
      @click="toggleSidebar"
      class="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 hover:border-white hover:bg-white/10 hover:scale-110 group"
      aria-label="Toggle menu"
    >
      <Menu
        :size="28"
        class="text-white/70 group-hover:text-white transition-colors duration-300"
      />
    </button>
  </Motion>

  <!-- Sidebar -->
  <Transition
    enter-active-class="transition-transform duration-500 ease-out"
    leave-active-class="transition-transform duration-500 ease-in"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="isSidebarOpen"
      class="fixed top-0 right-0 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 h-screen bg-linear-to-br from-slate-900 via-black to-slate-900 z-40 shadow-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Close Button -->
      <button
        @click="toggleSidebar"
        class="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:rotate-90 group z-50"
        aria-label="Close menu"
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

        <!-- Menu Items -->
        <nav class="space-y-1 md:space-y-2">
          <Motion
            v-for="(item, index) in MENU_ITEMS"
            :key="item.id"
            :initial="ANIMATION_CONFIG.menuItem.initial"
            :animate="isSidebarOpen ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }"
            :transition="{
              ...ANIMATION_CONFIG.menuItem.transition,
              delay: index * 0.1,
            }"
          >
            <a
              :href="item.link"
              @click="toggleSidebar"
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

        <!-- Social Links -->
        <div class="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
          <p class="text-white/40 text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wider">
            Follow Me
          </p>
          <div class="flex gap-3 md:gap-4">
            <a
              v-for="social in socialLinksWithIcons"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-sky-400/20 hover:border-sky-400 hover:scale-110"
              :aria-label="`Visit ${social.name}`"
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
    </aside>
  </Transition>

  <!-- Overlay -->
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
</template>
