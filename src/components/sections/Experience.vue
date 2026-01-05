<script setup>
import { ref, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import imageSedulur from '@/assets/images/image.png'
import imageKretek from '@/assets/images/kretek.png'
import imageSapen from '@/assets/images/sapen.png'
import imageCendrawasih from '@/assets/images/cendreawasih.png'
import imageRebil from '@/assets/images/rebil.png'

const { locale } = useLanguage()

// Intersection Observer untuk scroll animations
const sectionVisible = ref(false)
const projectsVisible = ref([])

// Recent Projects Data
const projects = [
  {
    id: 5,
    title: 'Cendrawasih Rent Car (Landing Page)',
    description:
      'Landing page for Cendrawasih Rent Car featuring vehicle listings, booking system.',
    descriptionId:
      'Pembuatan website sewa mobil Cendrawasih dengan fitur daftar kendaraan dan pemesanan via WhatsApp.',
    tech: ['Vue Js', 'Tailwind CSS', 'SEO Optimization'],
    image: imageCendrawasih,
    link: 'https://www.sewamobiltangselcendrawasih.com/',
    github: 'https://github.com/dwicah79',
    year: '2025',
  },
  {
    id: 3,
    title: 'Super Sapen (SD Muhammadiyah Sapen PMB)',
    description:
      'New Student Admission (PMB) system for SD Muhammadiyah Sapen featuring online registration, document upload, selection process tracking, and admin dashboard for admission management.',
    descriptionId:
      'Sistem Penerimaan Murid Baru (PMB) untuk SD Muhammadiyah Sapen dengan fitur pendaftaran online, upload dokumen, pelacakan proses seleksi, dan dashboard admin untuk manajemen penerimaan.',
    tech: ['React.js', 'Laravel', 'MySQL', 'Tailwind CSS'],
    image: imageSapen,
    link: '#',
    github: 'https://github.com/dwicah79',
    year: '2025',
  },
  {
    id: 1,
    title: 'Partnership UAD',
    description:
      'Full-stack Partnership management System platform with admin dashboard, and real-time partnership management.',
    descriptionId:
      'Platform Company Profile full-stack dengan integrasi pembayaran, dashboard admin, dan manajemen inventori real-time.',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS'],
    image: imageSedulur,
    link: '#',
    github: 'https://github.com/dwicah79',
    year: '2024',
  },
  {
    id: 2,
    title: 'Kretek Village Borobudur',
    description:
      'Village profile website for KKN program featuring community information, local tourism spots, cultural heritage, and village administration services.',
    descriptionId:
      'Website profil desa untuk program KKN yang menampilkan informasi masyarakat, spot wisata lokal, warisan budaya, dan layanan administrasi desa.',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'PHP'],
    image: imageKretek,
    link: 'https://dusunkretek1.com/',
    github: 'https://github.com/dwicah79',
    year: '2024',
  },
  {
    id: 4,
    title: 'Rebil Rent Car',
    description:
      'Online car rental platform with vehicle listings, booking system, and user management.',
    descriptionId:
      'Platform penyewaan mobil online dengan daftar kendaraan, sistem pemesanan, dan manajemen pengguna.',
    tech: ['Laravel', 'Live Wire', 'My SQL'],
    image: imageRebil,
    link: '#',
    github: 'https://github.com/dwicah79',
    year: '2024',
  },
]

onMounted(() => {
  projectsVisible.value = new Array(projects.length).fill(false)

  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target

        if (target.classList.contains('experience-section')) {
          sectionVisible.value = true
        }

        const projectIndex = target.dataset.projectIndex
        if (projectIndex !== undefined) {
          projectsVisible.value[parseInt(projectIndex)] = true
        }
      }
    })
  }, options)

  setTimeout(() => {
    const sectionEl = document.querySelector('.experience-section')
    if (sectionEl) observer.observe(sectionEl)

    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach((card) => observer.observe(card))
  }, 100)
})
</script>

<template>
  <section
    id="projects"
    class="experience-section min-h-screen w-full bg-white dark:bg-black py-32 px-6 transition-colors duration-500 overflow-hidden relative"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <Motion
        class="absolute top-20 left-20 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl"
        :animate="{
          scale: [1, 1.4, 1],
          x: [0, 80, 0],
          y: [0, -40, 0],
        }"
        :transition="{ duration: 18, repeat: Infinity, ease: 'easeInOut' }"
      />
      <Motion
        class="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-3xl"
        :animate="{
          scale: [1.3, 1, 1.3],
          x: [0, -60, 0],
          y: [0, 50, 0],
        }"
        :transition="{ duration: 22, repeat: Infinity, ease: 'easeInOut' }"
      />
    </div>

    <div class="max-w-7xl mx-auto w-full relative z-10">
      <!-- Section Title -->
      <Motion
        :initial="{ y: -100, opacity: 0, scale: 0.5 }"
        :animate="
          sectionVisible ? { y: 0, opacity: 1, scale: 1 } : { y: -100, opacity: 0, scale: 0.5 }
        "
        :transition="{
          duration: 1,
          delay: 0.2,
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }"
      >
        <h2
          class="text-6xl md:text-8xl font-bebas font-bold text-black dark:text-white mb-2 text-center"
        >
          RECENT PROJECTS
        </h2>
        <div class="w-32 h-1 bg-black dark:bg-white mx-auto mb-16"></div>
      </Motion>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Motion
          v-for="(project, index) in projects"
          :key="project.id"
          :data-project-index="index"
          class="project-card group"
          :initial="{
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotateX: index % 2 === 0 ? -30 : 30,
          }"
          :animate="
            projectsVisible[index]
              ? { y: 0, opacity: 1, scale: 1, rotateX: 0 }
              : { y: 100, opacity: 0, scale: 0.8, rotateX: index % 2 === 0 ? -30 : 30 }
          "
          :transition="{
            duration: 1,
            delay: index * 0.15,
            type: 'spring',
            stiffness: 80,
            damping: 15,
          }"
        >
          <div
            class="relative bg-slate-50 dark:bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-white hover:border-sky-400 dark:hover:border-sky-400 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 h-full flex flex-col"
          >
            <!-- Project Image -->
            <div class="relative h-64 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
              ></div>

              <!-- Year Badge -->
              <div
                class="absolute top-4 right-4 bg-black/70 dark:bg-white/70 text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm"
              >
                {{ project.year }}
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-8 flex flex-col grow">
              <!-- Title -->
              <h3
                class="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4 group-hover:text-sky-400 dark:group-hover:text-sky-400 transition-colors duration-300"
              >
                {{ project.title }}
              </h3>

              <!-- Description -->
              <p class="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed grow">
                {{ locale === 'id' ? project.descriptionId : project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="px-3 py-1 bg-indigo-100 dark:bg-black text-sky-400 dark:text-sky-400 rounded-full text-sm font-medium border border-indigo-200 dark:border-sky-400"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-4">
                <!-- View Demo / Locked Button -->
                <component
                  :is="project.link && project.link !== '#' ? 'a' : 'button'"
                  :href="project.link && project.link !== '#' ? project.link : undefined"
                  :target="project.link && project.link !== '#' ? '_blank' : undefined"
                  :rel="project.link && project.link !== '#' ? 'noopener noreferrer' : undefined"
                  :class="[
                    'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300',
                    project.link && project.link !== '#'
                      ? 'bg-black dark:bg-white text-white dark:text-black hover:scale-105 hover:shadow-xl cursor-pointer'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-70',
                  ]"
                >
                  <svg
                    v-if="project.link && project.link !== '#'"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {{ project.link && project.link !== '#' ? 'View Demo' : 'Locked (Secret)' }}
                </component>

                <!-- GitHub Button -->
                <a
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center px-6 py-3 bg-slate-200 dark:bg-slate-800 text-black dark:text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
