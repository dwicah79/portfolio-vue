<script setup>
import { computed, ref, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { getTranslation } from '@/constants/translations'

const { locale } = useLanguage()

// Translation helper
const t = (key) => computed(() => getTranslation(locale.value, key))

// Scroll animation states
const headerVisible = ref(false)
const bioVisible = ref(false)
const skillsVisible = ref(false)
const experienceVisible = ref(false)

// Parallax effect
const scrollY = ref(0)

onMounted(() => {
  const handleScroll = () => {
    scrollY.value = window.scrollY
  }
  window.addEventListener('scroll', handleScroll)

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        if (target.classList.contains('header-section')) headerVisible.value = true
        if (target.classList.contains('bio-section')) bioVisible.value = true
        if (target.classList.contains('skills-section')) skillsVisible.value = true
        if (target.classList.contains('experience-section')) experienceVisible.value = true
      }
    })
  }, observerOptions)

  // Observe elements
  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))

  return () => {
    window.removeEventListener('scroll', handleScroll)
    observer.disconnect()
  }
})

// Parallax offset calculation
const parallaxOffset = computed(() => scrollY.value * 0.5)

// Skills data
const skills = [
  { name: 'Vue.js', level: 90, category: 'Frontend' },
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'TypeScript', level: 88, category: 'Language' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'PHP', level: 80, category: 'Backend' },
  { name: 'MySQL', level: 82, category: 'Database' },
  { name: 'MongoDB', level: 78, category: 'Database' },
  { name: 'Docker', level: 75, category: 'DevOps' },
]

// Experience data
const experiences = [
  {
    year: '2023 - Present',
    title: 'Senior Full Stack Developer',
    company: 'Tech Company',
    description: 'Leading development of modern web applications using Vue.js and Node.js',
  },
  {
    year: '2021 - 2023',
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    description: 'Built scalable web applications and RESTful APIs',
  },
  {
    year: '2019 - 2021',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Created responsive and interactive user interfaces',
  },
]
</script>

<template>
  <section
    id="about"
    class="min-h-screen w-full bg-white dark:bg-black py-20 px-6 md:px-12 lg:px-20 transition-colors duration-500"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <Motion
        :initial="{ y: -50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
      >
        <div class="mb-16 text-center">
          <h2 class="text-5xl md:text-7xl font-bebas font-bold text-black dark:text-white mb-4">
            {{ t('about.title').value || 'About Me' }}
          </h2>
          <div
            class="w-32 h-1 bg-black dark:bg-white mx-auto rounded-full transition-colors duration-300"
          ></div>
        </div>
      </Motion>

      <!-- About Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <!-- Left: Bio -->
        <Motion
          :initial="{ x: -100, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.8, delay: 0.4 }"
        >
          <div class="space-y-6">
            <h3 class="text-3xl md:text-4xl font-bold text-black dark:text-white font-bebas">
              {{ t('about.subtitle').value || 'Full Stack Developer' }}
            </h3>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {{
                t('about.bio1').value ||
                'Passionate full stack developer with 5+ years of experience in building modern web applications. I love creating beautiful, functional, and user-friendly digital experiences.'
              }}
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {{
                t('about.bio2').value ||
                'Specialized in Vue.js, React, Node.js, and modern web technologies. Always eager to learn new technologies and best practices to deliver high-quality solutions.'
              }}
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-6">
              <div class="text-center">
                <div class="text-4xl font-bold text-sky-500 font-bebas">5+</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {{ t('about.yearsExp').value || 'Years Exp' }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-sky-500 font-bebas">50+</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {{ t('about.projects').value || 'Projects' }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-sky-500 font-bebas">20+</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {{ t('about.clients').value || 'Clients' }}
                </div>
              </div>
            </div>
          </div>
        </Motion>

        <!-- Right: Skills -->
        <Motion
          :initial="{ x: 100, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 0.8, delay: 0.6 }"
        >
          <div class="space-y-6">
            <h3 class="text-3xl md:text-4xl font-bold text-black dark:text-white font-bebas mb-6">
              {{ t('about.skills').value || 'Skills' }}
            </h3>

            <div class="space-y-5">
              <Motion
                v-for="(skill, index) in skills"
                :key="skill.name"
                :initial="{ x: 50, opacity: 0 }"
                :animate="{ x: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.8 + index * 0.1 }"
              >
                <div>
                  <div class="flex justify-between mb-2">
                    <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {{ skill.name }}
                    </span>
                    <span class="text-sm text-slate-500 dark:text-slate-400">
                      {{ skill.level }}%
                    </span>
                  </div>
                  <div
                    class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
                  >
                    <Motion
                      class="h-full bg-linear-to-r from-sky-400 to-sky-600 rounded-full"
                      :initial="{ width: '0%' }"
                      :animate="{ width: skill.level + '%' }"
                      :transition="{ duration: 1, delay: 1 + index * 0.1 }"
                    />
                  </div>
                </div>
              </Motion>
            </div>
          </div>
        </Motion>
      </div>

      <!-- Experience Timeline -->
      <div
        class="animate-on-scroll experience-section transition-all duration-1000 delay-600"
        :class="experienceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <h3
          class="text-3xl md:text-4xl font-bold text-black dark:text-white font-bebas mb-10 text-center"
        >
          {{ t('about.experience').value || 'Experience' }}
        </h3>

        <div class="space-y-8">
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="relative pl-8 md:pl-12 border-l-2 border-slate-300 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 transition-all duration-700 group"
            :class="
              experienceVisible
                ? 'opacity-100 translate-x-0'
                : index % 2 === 0
                  ? 'opacity-0 -translate-x-10'
                  : 'opacity-0 translate-x-10'
            "
            :style="{ transitionDelay: `${800 + index * 200}ms` }"
          >
            <!-- Timeline dot -->
            <div
              class="absolute -left-2 top-0 w-4 h-4 bg-sky-400 rounded-full border-4 border-white dark:border-black group-hover:scale-125 transition-transform duration-300"
            ></div>

            <div
              class="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg hover:shadow-lg hover:shadow-sky-400/10 transition-all duration-300"
            >
              <div class="text-sm text-sky-500 font-semibold mb-2">{{ exp.year }}</div>
              <h4 class="text-xl font-bold text-black dark:text-white mb-1">
                {{ exp.title }}
              </h4>
              <div class="text-slate-600 dark:text-slate-400 font-medium mb-3">
                {{ exp.company }}
              </div>
              <p class="text-slate-600 dark:text-slate-300">{{ exp.description }}</p>
            </div>
          </div>
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
</style>
