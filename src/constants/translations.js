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
