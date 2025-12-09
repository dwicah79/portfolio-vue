<script setup>
import { ref, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { locale } = useLanguage()

// Intersection Observer untuk scroll animations
const sectionVisible = ref(false)
const contactsVisible = ref([])

// Contact Information
const contacts = [
  {
    id: 1,
    name: 'Email',
    nameId: 'Email',
    value: 'dwicahyonugroho79@gmail.com',
    link: 'mailto:dwicahyonugroho79@gmail.com',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    hoverColor: 'group-hover:text-red-500 dark:group-hover:text-red-400',
    hoverBg: 'group-hover:bg-red-50 dark:group-hover:bg-red-900/20',
    hoverBorder: 'group-hover:border-red-500 dark:group-hover:border-red-400',
  },
  {
    id: 2,
    name: 'Phone',
    nameId: 'Telepon',
    value: '+62 82373324547',
    link: 'tel:+6282373324547',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    hoverColor: 'group-hover:text-green-500 dark:group-hover:text-green-400',
    hoverBg: 'group-hover:bg-green-50 dark:group-hover:bg-green-900/20',
    hoverBorder: 'group-hover:border-green-500 dark:group-hover:border-green-400',
  },
  {
    id: 3,
    name: 'LinkedIn',
    nameId: 'LinkedIn',
    value: 'Dwi Cahyo Nugroho',
    link: 'https://www.linkedin.com/in/dwicahyonugroho30/',
    icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
    hoverColor: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    hoverBg: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20',
    hoverBorder: 'group-hover:border-blue-600 dark:group-hover:border-blue-400',
  },
  {
    id: 4,
    name: 'GitHub',
    nameId: 'GitHub',
    value: '@dwicah79',
    link: 'https://github.com/dwicah79',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    hoverColor: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
    hoverBg: 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20',
    hoverBorder: 'group-hover:border-indigo-600 dark:group-hover:border-indigo-400',
  },
]

onMounted(() => {
  // Initialize contacts visibility array
  contactsVisible.value = new Array(contacts.length).fill(false)

  // Setup Intersection Observer
  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target

        if (target.classList.contains('contact-section')) {
          sectionVisible.value = true
        }

        // Check for contact cards
        const contactIndex = target.dataset.contactIndex
        if (contactIndex !== undefined) {
          contactsVisible.value[parseInt(contactIndex)] = true
        }
      }
    })
  }, options)

  setTimeout(() => {
    const sectionEl = document.querySelector('.contact-section')
    if (sectionEl) observer.observe(sectionEl)

    // Observe each contact card
    const contactCards = document.querySelectorAll('.contact-card')
    contactCards.forEach((card) => observer.observe(card))
  }, 100)
})
</script>

<template>
  <section
    id="contact"
    class="contact-section min-h-screen w-full bg-white dark:bg-black py-32 px-6 transition-colors duration-500 overflow-hidden relative flex items-center"
  >
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <Motion
        class="absolute top-20 right-20 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl"
        :animate="{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }"
        :transition="{ duration: 20, repeat: Infinity, ease: 'easeInOut' }"
      />
      <Motion
        class="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl"
        :animate="{
          scale: [1.2, 1, 1.2],
          x: [0, 80, 0],
          y: [0, -50, 0],
        }"
        :transition="{ duration: 25, repeat: Infinity, ease: 'easeInOut' }"
      />
    </div>

    <div class="max-w-6xl mx-auto w-full relative z-10">
      <!-- Section Title -->
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
          {{ locale === 'id' ? 'HUBUNGI SAYA' : 'GET IN TOUCH' }}
        </h2>
        <div class="w-32 h-1 bg-black dark:bg-white mx-auto mb-8"></div>
        <p
          class="text-center text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto"
        >
          {{
            locale === 'id'
              ? 'Tertarik untuk berkolaborasi? Jangan ragu untuk menghubungi saya!'
              : 'Interested in working together? Feel free to reach out!'
          }}
        </p>
      </Motion>

      <!-- Contact Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <Motion
          v-for="(contact, index) in contacts"
          :key="contact.id"
          :data-contact-index="index"
          class="contact-card group"
          :initial="{
            y: 100,
            opacity: 0,
            scale: 0.8,
          }"
          :animate="
            contactsVisible[index]
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 100, opacity: 0, scale: 0.8 }
          "
          :transition="{
            duration: 0.8,
            delay: index * 0.15,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }"
        >
          <a
            :href="contact.link"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'relative block p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl',
              'bg-slate-50 dark:bg-slate-900',
              'border-slate-200 dark:border-slate-800',
              contact.hoverBorder,
              contact.hoverBg,
            ]"
          >
            <!-- Icon -->
            <div
              :class="[
                'w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110',
                'bg-white dark:bg-slate-800 shadow-lg border-2 border-slate-200 dark:border-slate-700',
              ]"
            >
              <svg
                v-if="contact.id === 4"
                :class="[
                  'w-8 h-8 transition-colors text-black dark:text-white',
                  contact.hoverColor,
                ]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path :d="contact.icon" />
              </svg>
              <svg
                v-else
                :class="[
                  'w-8 h-8 transition-colors text-black dark:text-white',
                  contact.hoverColor,
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="contact.icon"
                />
              </svg>
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-bold text-black dark:text-white mb-2 transition-colors">
              {{ locale === 'id' ? contact.nameId : contact.name }}
            </h3>
            <p
              :class="[
                'text-lg font-medium transition-colors text-slate-600 dark:text-slate-400',
                contact.hoverColor,
              ]"
            >
              {{ contact.value }}
            </p>

            <!-- Arrow Icon -->
            <div
              class="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                class="w-6 h-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </a>
        </Motion>
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
