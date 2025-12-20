<script setup>
import { useLanguage } from '@/composables/useLanguage'

const { locale } = useLanguage()

const currentYear = new Date().getFullYear()

// Social Links
const socials = [
  {
    name: 'GitHub',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    link: 'https://github.com/dwicah79',
  },
  {
    name: 'LinkedIn',
    icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
    link: 'https://www.linkedin.com/in/dwi-cahyo-nugroho-408b92269/',
  },
  {
    name: 'Email',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    link: 'mailto:dwicahyonugroho79@gmail.com',
  },
]

// Quick Links
const quickLinks = [
  { name: 'Home', nameId: 'Beranda', href: '#hero' },
  { name: 'About', nameId: 'Tentang', href: '#about' },
  { name: 'Projects', nameId: 'Proyek', href: '#experience' },
  { name: 'Contact', nameId: 'Kontak', href: '#contact' },
]
</script>

<template>
  <footer class="bg-slate-900 dark:bg-black text-white py-16 px-6 border-t border-slate-800">
    <div class="max-w-7xl mx-auto">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand Section -->
        <div class="space-y-4">
          <h3 class="text-3xl font-bebas font-bold tracking-wider">DWI CAHYO NUGROHO</h3>
          <p class="text-slate-400 leading-relaxed">
            {{
              locale === 'id'
                ? 'Full-stack Developer yang bersemangat dalam merancang dan membangun solusi digital inovatif, efisien, dan berdampak.'
                : 'Passionate Full-stack Developer building innovative digital solutions.'
            }}
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-xl font-bold text-white mb-4">
            {{ locale === 'id' ? 'Tautan Cepat' : 'Quick Links' }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.href">
              <a
                :href="link.href"
                class="text-slate-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
              >
                <span class="w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4"></span>
                {{ locale === 'id' ? link.nameId : link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="space-y-4">
          <h4 class="text-xl font-bold text-white mb-4">
            {{ locale === 'id' ? 'Ikuti Saya' : 'Follow Me' }}
          </h4>
          <div class="flex gap-4">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-slate-800 hover:bg-white dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              :title="social.name"
            >
              <svg
                class="w-6 h-6 text-white group-hover:text-black dark:group-hover:text-white transition-colors"
                :class="{ 'fill-current': social.name === 'GitHub' }"
                :fill="social.name === 'GitHub' ? 'currentColor' : 'none'"
                :stroke="social.name !== 'GitHub' ? 'currentColor' : 'none'"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="social.name !== 'GitHub'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="social.icon"
                />
                <path v-else :d="social.icon" />
              </svg>
            </a>
          </div>
          <p class="text-slate-500 text-sm mt-6">
            {{
              locale === 'id'
                ? 'Mari terhubung dan berkolaborasi!'
                : "Let's connect and collaborate!"
            }}
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-800 pt-8">
        <!-- Bottom Bar -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-slate-400 text-sm text-center md:text-left">
            © {{ currentYear }} Dwi Cahyo Nugroho.
            {{ locale === 'id' ? 'Hak Cipta Dilindungi.' : 'All rights reserved.' }}
          </p>
          <div class="flex items-center gap-2 text-slate-400 text-sm">
            <span>{{ locale === 'id' ? 'Dibuat dengan' : 'Built with' }}</span>
            <span class="text-red-500 animate-pulse">♥</span>
            <span>{{ locale === 'id' ? 'menggunakan' : 'using' }}</span>
            <span class="font-semibold text-white">Vue.js</span>
            <span>&</span>
            <span class="font-semibold text-white">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>
