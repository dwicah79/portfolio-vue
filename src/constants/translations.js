export const translations = {
  en: {
    nav: {
      title: 'Navigation',
      menu: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
      },
      followMe: 'Follow Me',
    },
    hero: {
      fullstack: 'Fullstack',
      developer: 'DEVELOPER',
      name: 'Dwi Cahyo Nugroho',
    },
    about: {
      title: 'WHO AM I?',
      name: 'Dwi Cahyo Nugroho',
      role: 'Fullstack Developer',
      intro: "Hello! I'm",
      introText:
        ', a passionate Fullstack Developer for over 1 years. Specializing in building dynamic and intuitive user experiences with',
      and: 'and',
      bio1: 'As a self-taught developer, my journey has been fueled by an insatiable curiosity and a commitment to continuous learning. I gained valuable experience in integrating various backend technologies like Laravel, PHP, and MySQL, as well as advanced technologies.',
      bio2: "Beyond writing code, I'm passionate about sharing my knowledge and experiences in web development on social media. I am always excited to explore new technologies, solve problems creatively, and contribute to projects that have a real impact.",
      cta: 'I am open to new opportunities and collaborations! Feel free to reach out to me. 🚀',
    },
  },
  id: {
    nav: {
      title: 'Navigasi',
      menu: {
        home: 'Beranda',
        about: 'Tentang',
        projects: 'Projek',
        contact: 'Kontak',
      },
      followMe: 'Ikuti Saya',
    },
    hero: {
      fullstack: 'Fullstack',
      developer: 'DEVELOPER',
      name: 'Dwi Cahyo Nugroho',
    },
    about: {
      title: 'SIAPA SAYA?',
      name: 'Dwi Cahyo Nugroho',
      role: 'Fullstack Developer',
      intro: 'Halo! Saya',
      introText:
        ', seorang Fullstack Developer yang passionate selama lebih dari 1 tahun. Spesialisasi dalam membangun pengalaman pengguna yang dinamis dan intuitif dengan',
      and: 'dan',
      bio1: 'Sebagai developer otodidak, perjalanan saya didorong oleh rasa ingin tahu yang tak terpuaskan dan komitmen untuk terus belajar. Saya mendapatkan pengalaman berharga dalam mengintegrasikan berbagai teknologi backend seperti Laravel, PHP, dan MySQL, serta teknologi canggih lainnya.',
      bio2: 'Selain menulis kode, saya passionate dalam membagikan pengetahuan dan pengalaman saya dalam pengembangan web di media sosial. Saya selalu bersemangat untuk mengeksplorasi teknologi baru, memecahkan masalah secara kreatif, dan berkontribusi pada proyek yang memiliki dampak nyata.',
      cta: 'Saya terbuka untuk peluang dan kolaborasi baru! Jangan ragu untuk menghubungi saya. 🚀',
    },
  },
}

export function getTranslation(locale, key) {
  const keys = key.split('.')
  let value = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
