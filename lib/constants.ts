// ─── Placeholder video URLs ───────────────────────────────────────────────────
// Replace the value string with your local path (e.g. "/videos/hero.mp4")
// once your final video files are in /public/videos/.

export const VIDEO_URLS = {
  // Shown on the split-screen homepage hero (full-screen background)
  hero: '/videos/hero.mp4',

  // Fallback stream used until the local file is ready
  heroPoster:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',

  // Per-section heroes on the sub-pages
  restaurant: '/videos/restaurant.mp4',
  bar: '/videos/bar.mp4',

  // External placeholder (used while /public/videos/ is still empty)
  placeholder:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
} as const;
