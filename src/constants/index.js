export const MENU_ITEMS = [
  { name: 'Home', link: '#', id: 'home' },
  { name: 'About', link: '#about', id: 'about' },
  { name: 'Projects', link: '#projects', id: 'projects' },
  { name: 'Contact', link: '#contact', id: 'contact' },
]

export const SOCIAL_LINKS = [
  {
    name: 'Github',
    url: 'https://github.com/dwicah79',
    delay: 0,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/dwicah79',
    delay: 0.2,
  },
  {
    name: 'Linkedin',
    url: 'https://linkedin.com/in/dwicah79',
    delay: 0.4,
  },
]

export const ANIMATION_CONFIG = {
  hamburger: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      duration: 0.5,
      delay: 2,
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  menuItem: {
    initial: { x: 100, opacity: 0 },
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  hero: {
    fullstack: {
      initial: { x: -500, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: {
        duration: 0.8,
        delay: 0,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    photo: {
      initial: { y: -500, opacity: 0, rotate: 12 },
      animate: { y: 0, opacity: 0.3, rotate: 12 },
      transition: {
        duration: 1,
        delay: 0.5,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
    developer: {
      initial: { x: 500, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: {
        duration: 0.8,
        delay: 1.2,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    name: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: {
        duration: 0.8,
        delay: 1.5,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
    socialIcon: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  },
}
