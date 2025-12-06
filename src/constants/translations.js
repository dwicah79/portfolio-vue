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
      title: 'About Me',
      subtitle: 'Full Stack Developer',
      bio1: 'Passionate full stack developer with 5+ years of experience in building modern web applications. I love creating beautiful, functional, and user-friendly digital experiences.',
      bio2: 'Specialized in Vue.js, React, Node.js, and modern web technologies. Always eager to learn new technologies and best practices to deliver high-quality solutions.',
      yearsExp: 'Years Exp',
      projects: 'Projects',
      clients: 'Clients',
      skills: 'Skills',
      experience: 'Experience',
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
      title: 'Tentang Saya',
      subtitle: 'Full Stack Developer',
      bio1: 'Developer full stack yang passionate dengan pengalaman 5+ tahun dalam membangun aplikasi web modern. Saya suka menciptakan pengalaman digital yang indah, fungsional, dan user-friendly.',
      bio2: 'Spesialisasi dalam Vue.js, React, Node.js, dan teknologi web modern. Selalu bersemangat untuk mempelajari teknologi baru dan praktik terbaik untuk memberikan solusi berkualitas tinggi.',
      yearsExp: 'Tahun Exp',
      projects: 'Projek',
      clients: 'Klien',
      skills: 'Keahlian',
      experience: 'Pengalaman',
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
