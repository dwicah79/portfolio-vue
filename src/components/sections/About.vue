<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
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
    class="min-h-screen w-full bg-white dark:bg-black py-32 px-6 transition-colors duration-500 overflow-hidden flex items-center"
  >
    <div class="max-w-7xl mx-auto w-full">
      <!-- Scroll Progress Indicator -->
      <Motion
        class="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-left z-50"
        :style="{
          scaleX: scrollProgress,
        }"
      />

      <!-- Section Title -->
      <Motion
        :initial="{ y: -50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.1 }"
      >
        <h2
          class="text-6xl md:text-8xl font-bebas font-bold text-black dark:text-white mb-2 text-center"
        >
          WHO AM I?
        </h2>
        <div class="w-32 h-1 bg-black dark:bg-white mx-auto mb-16"></div>
      </Motion>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
        <!-- Left: Avatar with Tech Logos (3 columns) -->
        <div class="lg:col-span-2 flex justify-center">
          <Motion
            class="relative w-fit"
            :initial="{ scale: 0, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :transition="{
              duration: 0.8,
              delay: 0.3,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }"
          >
            <!-- Avatar -->
            <div
              class="w-[280px] h-[280px] md:w-[380px] md:h-[380px] group rounded-full overflow-hidden border-[8px] border-slate-800 dark:border-white shadow-2xl relative z-10 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900"
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
              class="tech-logo absolute w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center border-[3px] border-slate-300 dark:border-slate-600 hover:scale-125 transition-all duration-300 z-20 backdrop-blur-sm"
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
              <img
                :src="tech.icon"
                :alt="tech.name"
                class="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </Motion>
          </Motion>
        </div>

        <!-- Right: Content (3 columns) -->
        <div class="lg:col-span-3 space-y-6 lg:pl-8">
          <Motion
            :initial="{ x: 100, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
          >
            <p
              class="text-xl text-justify md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              Hello! I'm
              <span class="font-bold text-black dark:text-white text-2xl md:text-3xl"
                >Dwi Cahyo Nugroho</span
              >, a passionate
              <span class="font-bold">Fullstack Developer</span>
              for over 1 years. Specializing in building dynamic and intuitive user experiences with
              <a href="#" class="hover:underline font-semibold underline">Vue.js</a>
              and
              <a href="#" class="hover:underline font-semibold underline">Laravel</a>.
            </p>
          </Motion>

          <Motion
            :initial="{ x: 100, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.5 }"
          >
            <p
              class="text-lg text-justify md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              As a self-taught developer, my journey has been fueled by an insatiable curiosity and
              a commitment to continuous learning. I gained valuable experience in integrating
              various backend technologies like
              <span class="font-semibold">Laravel</span>, <span class="font-semibold">PHP</span>,
              and <span class="font-semibold">MySQL</span>, as well as advanced technologies.
            </p>
          </Motion>

          <Motion
            :initial="{ x: 100, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.6 }"
          >
            <p
              class="text-lg text-justify md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              Beyond writing code, I'm passionate about sharing my knowledge and experiences in web
              development on social media. I am always excited to explore new technologies, solve
              problems creatively, and contribute to projects that have a real impact.
            </p>
          </Motion>

          <Motion
            :initial="{ x: 100, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.7 }"
          >
            <p
              class="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
            >
              I am open to new opportunities and collaborations! Feel free to reach out to me. 🚀
            </p>
          </Motion>
        </div>
      </div>
    </div>
  </section>
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
