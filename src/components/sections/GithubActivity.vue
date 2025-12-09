<script setup>
import { ref, onMounted, computed } from 'vue'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL

const contributions = ref([])
const stats = ref({
  totalContributions: 0,
  currentStreak: 0,
  longestStreak: 0,
})
const loading = ref(true)
const error = ref(null)

const sectionVisible = ref(false)
const calendarVisible = ref(false)
const statsVisible = ref(false)

const fetchGitHubContributions = async () => {
  try {
    loading.value = true
    error.value = null

    const token = import.meta.env.VITE_GITHUB_TOKEN

    if (!token) {
      console.warn('No GitHub token found. Using demo data.')
      generateMockData()
      return
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data')
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar

    contributions.value = calendar.weeks.flatMap((week) => week.contributionDays)
    stats.value.totalContributions = calendar.totalContributions

    calculateStreaks()
  } catch (err) {
    console.error('Error fetching GitHub contributions:', err)
    error.value = err.message
    generateMockData()
  } finally {
    loading.value = false
  }
}

const generateMockData = () => {
  const today = new Date()
  const mockDays = []
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 364)
  const dayOfWeek = startDate.getDay()
  if (dayOfWeek !== 0) {
    startDate.setDate(startDate.getDate() - dayOfWeek)
  }

  let currentDate = new Date(startDate)
  while (currentDate <= today) {
    mockDays.push({
      date: currentDate.toISOString().split('T')[0],
      contributionCount: Math.floor(Math.random() * 15),
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  contributions.value = mockDays
  stats.value.totalContributions = mockDays.reduce((sum, day) => sum + day.contributionCount, 0)
  calculateStreaks()
}

const calculateStreaks = () => {
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  const sortedDays = [...contributions.value].reverse()

  for (let i = 0; i < sortedDays.length; i++) {
    if (sortedDays[i].contributionCount > 0) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
      if (i === 0) currentStreak = tempStreak
    } else {
      if (i === 0) break
      tempStreak = 0
    }
  }

  stats.value.currentStreak = currentStreak
  stats.value.longestStreak = longestStreak
}

const getContributionColor = (count) => {
  if (count === 0)
    return 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
  if (count < 4) return 'bg-green-200 dark:bg-green-900'
  if (count < 8) return 'bg-green-300 dark:bg-green-700'
  if (count < 12) return 'bg-green-500 dark:bg-green-600'
  return 'bg-green-700 dark:bg-green-500'
}

const contributionsByWeek = computed(() => {
  if (!contributions.value.length) return []

  const weeks = []
  let currentWeek = []

  contributions.value.forEach((day, index) => {
    const date = new Date(day.date)
    const dayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    currentWeek.push(day)

    if (index === contributions.value.length - 1) {
      weeks.push(currentWeek)
    }
  })

  return weeks
})

const monthLabels = computed(() => {
  if (!contributionsByWeek.value.length) return []

  const labels = []
  let lastMonth = -1

  contributionsByWeek.value.forEach((week, weekIndex) => {
    if (week.length === 0) return

    const checkDay = week[Math.min(3, week.length - 1)]
    if (!checkDay) return

    const date = new Date(checkDay.date)
    const month = date.getMonth()

    if (month !== lastMonth && weekIndex > 0) {
      labels.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        weekIndex: weekIndex,
      })
      lastMonth = month
    } else if (weekIndex === 0) {
      labels.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        weekIndex: 0,
      })
      lastMonth = month
    }
  })

  return labels
})

onMounted(() => {
  fetchGitHubContributions()

  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        if (target.classList.contains('github-section')) sectionVisible.value = true
        if (target.classList.contains('calendar-section')) calendarVisible.value = true
        if (target.classList.contains('stats-section')) statsVisible.value = true
      }
    })
  }, options)

  setTimeout(() => {
    const sectionEl = document.querySelector('.github-section')
    const calendarEl = document.querySelector('.calendar-section')
    const statsEl = document.querySelector('.stats-section')

    if (sectionEl) observer.observe(sectionEl)
    if (calendarEl) observer.observe(calendarEl)
    if (statsEl) observer.observe(statsEl)
  }, 100)
})
</script>

<template>
  <section
    id="github"
    class="github-section min-h-screen w-full bg-slate-50 dark:bg-slate-950 py-32 px-6 transition-colors duration-500 overflow-hidden flex items-center relative"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <Motion
        class="absolute top-20 right-20 w-96 h-96 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl"
        :animate="{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }"
        :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut' }"
      />
      <Motion
        class="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl"
        :animate="{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }"
        :transition="{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }"
      />
    </div>

    <div class="max-w-7xl mx-auto w-full relative z-10">
      <Motion
        :initial="{ y: -100, opacity: 0, scale: 0.5 }"
        :animate="
          sectionVisible ? { y: 0, opacity: 1, scale: 1 } : { y: -100, opacity: 0, scale: 0.5 }
        "
        :transition="{ duration: 1, delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }"
      >
        <h2
          class="text-6xl md:text-8xl font-bebas font-bold text-black dark:text-white mb-2 text-center"
        >
          GITHUB ACTIVITY
        </h2>
        <div class="w-32 h-1 bg-black dark:bg-white mx-auto mb-16"></div>
      </Motion>

      <div class="stats-section grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Motion
          v-for="(stat, index) in [
            { label: 'Total Contributions', value: stats.totalContributions },
            { label: 'Current Streak', value: stats.currentStreak, suffix: ' days' },
            { label: 'Longest Streak', value: stats.longestStreak, suffix: ' days' },
            { label: 'This Year', value: stats.totalContributions },
          ]"
          :key="index"
          :initial="{ y: 50, opacity: 0, scale: 0.8 }"
          :animate="
            statsVisible ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.8 }
          "
          :transition="{
            duration: 0.8,
            delay: index * 0.1,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }"
          class="rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20"
        >
          <div class="text-center">
            <p class="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
              {{ stat.value }}{{ stat.suffix || '' }}
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ stat.label }}</p>
          </div>
        </Motion>
      </div>

      <Motion
        class="calendar-section bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800"
        :initial="{ scale: 0.8, opacity: 0 }"
        :animate="calendarVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }"
        :transition="{ duration: 1, type: 'spring', stiffness: 80, damping: 15 }"
      >
        <div v-if="loading" class="text-center py-12">
          <div
            class="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="mt-4 text-slate-600 dark:text-slate-400">Loading GitHub activity...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <p class="text-slate-600 dark:text-slate-400">Showing demo data</p>
        </div>

        <div v-else>
          <div class="w-full">
            <div class="mb-6 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200">
                @{{ GITHUB_USERNAME }} Contributions
              </h3>
              <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span>Less</span>
                <div class="flex gap-1">
                  <div
                    class="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  ></div>
                  <div class="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-600"></div>
                  <div class="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-500"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            <!-- Calendar Grid with Month Labels - Overflow on mobile -->
            <div class="relative w-full overflow-x-auto">
              <div class="min-w-[800px]">
                <div class="flex mb-2 pl-12 relative" style="height: 15px">
                  <div
                    v-for="(label, index) in monthLabels"
                    :key="index"
                    class="flex-1 text-xs text-slate-600 dark:text-slate-400"
                  >
                    {{ label.month }}
                  </div>
                </div>

                <div class="flex gap-2 w-full">
                  <div
                    class="flex flex-col justify-between text-xs text-slate-600 dark:text-slate-400 w-8"
                    style="height: 105px"
                  >
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  <div class="flex-1 flex gap-0.5">
                    <div
                      v-for="(week, weekIndex) in contributionsByWeek"
                      :key="weekIndex"
                      class="flex-1 flex flex-col gap-0.5"
                    >
                      <Motion
                        v-for="(day, dayIndex) in week"
                        :key="day.date"
                        :initial="{ scale: 0, opacity: 0 }"
                        :animate="
                          calendarVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                        "
                        :transition="{
                          duration: 0.3,
                          delay: (weekIndex * 7 + dayIndex) * 0.002,
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                        }"
                        :class="[
                          'w-full aspect-square rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-green-500',
                          getContributionColor(day.contributionCount),
                        ]"
                        :title="`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- GitHub Link -->
          <div class="mt-8 text-center">
            <a
              :href="`https://github.com/${GITHUB_USERNAME}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </Motion>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
