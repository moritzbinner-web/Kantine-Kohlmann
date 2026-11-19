/* Konfiguration des Admin-Panels (Bereiche, Beschriftungen, ausgeblendete Felder) */
window.ADMIN_CONFIG = {
  title: 'Kantine Kohlmann',
  accent: '#9c7b4a',
  sections: { index: 'Startseite', restaurant: 'Restaurant', bar: 'Bar' },
  sectionHints: {
    index: 'SEO-Texte, Kontakt und die drei Kacheln (Restaurant, Bar, Events)',
    restaurant: 'Kopfbereich, Über uns, Öffnungszeiten, Galerie und Speisekarte',
    bar: 'Kopfbereich, Über uns, Öffnungszeiten, Drinks, Galerie und Events',
  },
  hidden: ['page', 'id', 'videoSrc'],
  labels: { videoPlaceholder: 'Hintergrund-Video' },
};
