<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { getTranslation } from '@/constants/translations'

// Composables
const { locale } = useLanguage()

// Scroll progress (manual implementation)
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  // Calculate scroll progress (0 to 1)
  const scrollable = documentHeight - windowHeight
  scrollProgress.value = scrollable > 0 ? scrollTop / scrollable : 0
}

// Intersection Observer untuk scroll animations
const titleVisible = ref(false)
const avatarVisible = ref(false)
const text1Visible = ref(false)
const text2Visible = ref(false)
const text3Visible = ref(false)
const text4Visible = ref(false)

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()

  // Setup Intersection Observer untuk animasi scroll
  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target
      // Toggle visibility based on intersection
      if (target.classList.contains('title-section')) {
        titleVisible.value = entry.isIntersecting
      }
      if (target.classList.contains('avatar-section')) {
        avatarVisible.value = entry.isIntersecting
      }
      if (target.classList.contains('text-1')) {
        text1Visible.value = entry.isIntersecting
      }
      if (target.classList.contains('text-2')) {
        text2Visible.value = entry.isIntersecting
      }
      if (target.classList.contains('text-3')) {
        text3Visible.value = entry.isIntersecting
      }
      if (target.classList.contains('text-4')) {
        text4Visible.value = entry.isIntersecting
      }
    })
  }, options)

  // Observe elements setelah DOM ready
  setTimeout(() => {
    const titleEl = document.querySelector('.title-section')
    const avatarEl = document.querySelector('.avatar-section')
    const text1El = document.querySelector('.text-1')
    const text2El = document.querySelector('.text-2')
    const text3El = document.querySelector('.text-3')
    const text4El = document.querySelector('.text-4')

    if (titleEl) observer.observe(titleEl)
    if (avatarEl) observer.observe(avatarEl)
    if (text1El) observer.observe(text1El)
    if (text2El) observer.observe(text2El)
    if (text3El) observer.observe(text3El)
    if (text4El) observer.observe(text4El)
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

// Tech stack logos with positions (circular arrangement)
const techLogos = [
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    positionMobile: { top: '-25%', left: '50%', transform: 'translate(-50%, -50%)' },
    positionDesktop: { top: '-30%', left: '40%', transform: 'translate(-50%, -50%)' },
  },
  {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    positionMobile: { top: '5%', right: '-10%', transform: 'translate(0, 0)' },
    positionDesktop: { top: '0%', right: '-30%', transform: 'translate(0, 0)' },
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    positionMobile: { top: '40%', right: '-15%', transform: 'translate(0, -50%)' },
    positionDesktop: { top: '30%', right: '-35%', transform: 'translate(0, -50%)' },
  },
  {
    name: 'Laravel',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    positionMobile: { bottom: '25%', right: '-10%', transform: 'translate(0, 0)' },
    positionDesktop: { bottom: '17%', right: '-30%', transform: 'translate(0, 0)' },
  },
  {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    positionMobile: { bottom: '-25%', left: '50%', transform: 'translate(-50%, 50%)' },
    positionDesktop: { bottom: '-30%', left: '40%', transform: 'translate(-50%, 50%)' },
  },
  {
    name: 'Nuxt',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
    positionMobile: { bottom: '25%', left: '-10%', transform: 'translate(0, 0)' },
    positionDesktop: { bottom: '17%', left: '-35%', transform: 'translate(0, 0)' },
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    positionMobile: { top: '40%', left: '-15%', transform: 'translate(0, -50%)' },
    positionDesktop: { top: '30%', left: '-40%', transform: 'translate(0, -50%)' },
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    positionMobile: { top: '5%', left: '-10%', transform: 'translate(0, 0)' },
    positionDesktop: { top: '0%', left: '-30%', transform: 'translate(0, 0)' },
  },
]
</script>

<template>
  <section
    id="about"
    class="min-h-screen w-full bg-white dark:bg-black py-32 px-6 transition-colors duration-500 overflow-hidden flex items-center relative"
  >
    <!-- Animated background blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
      <Motion
        class="absolute -top-40 -left-40 w-96 h-96 bg-sky-400/20 dark:bg-sky-400/10 rounded-full blur-3xl"
        :animate="{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }"
        :transition="{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }"
      />
      <Motion
        class="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-400/20 dark:bg-purple-400/10 rounded-full blur-3xl"
        :animate="{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }"
        :transition="{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }"
      />
      <Motion
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-3xl"
        :animate="{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }"
        :transition="{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }"
      />
    </div>

    <div class="max-w-7xl mx-auto w-full relative z-10">
      <!-- Scroll Progress Indicator with gradient animation -->
      <Motion
        class="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-left z-50 shadow-lg shadow-blue-500/50"
        :style="{
          scaleX: scrollProgress,
        }"
        :animate="{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }"
        :transition="{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          },
        }"
      />

      <!-- Section Title -->
      <Motion
        class="title-section"
        :initial="{ y: -100, opacity: 0, scale: 0.5, rotateX: -90 }"
        :animate="
          titleVisible
            ? { y: 0, opacity: 1, scale: 1, rotateX: 0 }
            : { y: -100, opacity: 0, scale: 0.5, rotateX: -90 }
        "
        :transition="{ duration: 1, delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }"
      >
        <h2
          class="text-6xl md:text-8xl font-bebas font-bold text-black dark:text-white mb-2 text-center"
        >
          {{ getTranslation(locale, 'about.title') }}
        </h2>
        <Motion
          :initial="{ scaleX: 0, opacity: 0 }"
          :animate="titleVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }"
          :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
          class="w-32 h-1 bg-black dark:bg-white mx-auto mb-16 origin-center"
        ></Motion>
      </Motion>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
        <!-- Left: Avatar with Tech Logos (3 columns) -->
        <div class="lg:col-span-2 flex justify-center avatar-section">
          <Motion
            class="relative w-fit"
            :initial="{ scale: 0, opacity: 0, rotateY: -180 }"
            :animate="
              avatarVisible
                ? { scale: 1, opacity: 1, rotateY: 0 }
                : { scale: 0, opacity: 0, rotateY: -180 }
            "
            :transition="{
              duration: 1.2,
              delay: 0.3,
              type: 'spring',
              stiffness: 80,
              damping: 15,
            }"
          >
            <!-- Avatar -->
            <div
              class="w-[280px] h-[280px] md:w-[380px] md:h-[380px] group rounded-full overflow-hidden border-8 border-slate-800 dark:border-white shadow-2xl relative z-10 bg-linear-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900"
            >
              <img
                src="/src/assets/images/avatar.jpeg"
                alt="Dwi Cahyo Nugroho"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <!-- Tech Logos floating around -->
            <Motion
              v-for="(tech, index) in techLogos"
              :key="tech.name"
              class="tech-logo absolute w-16 h-16 md:w-14 md:h-14 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center border-[3px] border-slate-300 dark:border-slate-600 hover:scale-125 transition-all duration-300 z-20 backdrop-blur-sm"
              :style="{
                '--mobile-top': tech.positionMobile.top,
                '--mobile-bottom': tech.positionMobile.bottom,
                '--mobile-left': tech.positionMobile.left,
                '--mobile-right': tech.positionMobile.right,
                '--mobile-transform': tech.positionMobile.transform,
                '--desktop-top': tech.positionDesktop.top,
                '--desktop-bottom': tech.positionDesktop.bottom,
                '--desktop-left': tech.positionDesktop.left,
                '--desktop-right': tech.positionDesktop.right,
                '--desktop-transform': tech.positionDesktop.transform,
              }"
              :initial="{ scale: 0, opacity: 0, y: 0, x: 0, rotate: 0 }"
              :animate="{
                scale: 1,
                opacity: 1,
                y: [-30, 10, -40, 15, -30],
                x: [20, -15, 25, -20, 20],
                rotate: [0, 8, -8, 5, 0],
              }"
              :transition="{
                scale: {
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12,
                },
                opacity: {
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                },
                y: {
                  duration: 5,
                  delay: 0.5 + index * 0.4,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
                x: {
                  duration: 4.5,
                  delay: 0.5 + index * 0.4,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 6,
                  delay: 0.5 + index * 0.4,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
              }"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-8 h-8 object-contain" />
            </Motion>
          </Motion>
        </div>

        <!-- Right: Content (3 columns) -->
        <div class="lg:col-span-3 space-y-6 lg:pl-8">
          <Motion
            class="text-1"
            :initial="{ x: 200, opacity: 0, rotateY: 90, scale: 0.8 }"
            :animate="
              text1Visible
                ? { x: 0, opacity: 1, rotateY: 0, scale: 1 }
                : { x: 200, opacity: 0, rotateY: 90, scale: 0.8 }
            "
            :transition="{ duration: 1, delay: 0.2, type: 'spring', stiffness: 80, damping: 15 }"
          >
            <p
              class="text-xl text-justify md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-[1.02] cursor-default"
            >
              {{ getTranslation(locale, 'about.intro') }}
              <span class="font-bold text-black dark:text-white text-2xl md:text-3xl">{{
                getTranslation(locale, 'about.name')
              }}</span
              >{{ getTranslation(locale, 'about.introText') }}
              <a href="#" class="hover:underline font-semibold underline">Vue.js</a>
              {{ getTranslation(locale, 'about.and') }}
              <a href="#" class="hover:underline font-semibold underline">Laravel</a>.
            </p>
          </Motion>

          <Motion
            class="text-2"
            :initial="{ x: -200, opacity: 0, rotateX: -90, scale: 0.8 }"
            :animate="
              text2Visible
                ? { x: 0, opacity: 1, rotateX: 0, scale: 1 }
                : { x: -200, opacity: 0, rotateX: -90, scale: 0.8 }
            "
            :transition="{ duration: 1, delay: 0.3, type: 'spring', stiffness: 80, damping: 15 }"
          >
            <p
              class="text-lg text-justify md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-300 hover:text-slate-900 dark:hover:text-slate-200 hover:scale-[1.02] cursor-default"
            >
              {{ getTranslation(locale, 'about.bio1') }}
            </p>
          </Motion>

          <Motion
            class="text-3"
            :initial="{ y: 100, opacity: 0, scale: 0.5, rotateZ: -45 }"
            :animate="
              text3Visible
                ? { y: 0, opacity: 1, scale: 1, rotateZ: 0 }
                : { y: 100, opacity: 0, scale: 0.5, rotateZ: -45 }
            "
            :transition="{ duration: 1, delay: 0.4, type: 'spring', stiffness: 80, damping: 15 }"
          >
            <p
              class="text-lg text-justify md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-300 hover:text-slate-900 dark:hover:text-slate-200 hover:scale-[1.02] cursor-default"
            >
              {{ getTranslation(locale, 'about.bio2') }}
            </p>
          </Motion>

          <Motion
            class="text-4"
            :initial="{ x: 200, y: 100, opacity: 0, scale: 0.3, rotateY: 180 }"
            :animate="
              text4Visible
                ? { x: 0, y: 0, opacity: 1, scale: 1, rotateY: 0 }
                : { x: 200, y: 100, opacity: 0, scale: 0.3, rotateY: 180 }
            "
            :transition="{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 80, damping: 15 }"
          >
            <p
              class="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-[1.02] cursor-default"
            >
              {{ getTranslation(locale, 'about.cta') }}
            </p>
          </Motion>
        </div>
      </div>
    </div>
  </section>
  <div class="p-20 bg-white"></div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}

/* Tech logo responsive positioning */
.tech-logo {
  top: var(--mobile-top);
  bottom: var(--mobile-bottom);
  left: var(--mobile-left);
  right: var(--mobile-right);
  transform: var(--mobile-transform);
}

@media (min-width: 768px) {
  .tech-logo {
    top: var(--desktop-top);
    bottom: var(--desktop-bottom);
    left: var(--desktop-left);
    right: var(--desktop-right);
    transform: var(--desktop-transform);
  }
}
</style>
