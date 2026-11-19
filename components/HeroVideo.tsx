/** Hintergrund-Video im Kopfbereich: MP4/WebM-Datei, YouTube oder Vimeo (Link aus dem Admin-Panel). */
export function videoEmbed(v: string): { kind: "file" | "iframe"; src: string } | null {
  const s = (v ?? "").trim();
  if (!s) return null;
  const yt = s.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/i);
  if (yt) return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&mute=1&loop=1&playlist=${yt[1]}&controls=0&modestbranding=1&playsinline=1&rel=0` };
  const vm = s.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vm) return { kind: "iframe", src: `https://player.vimeo.com/video/${vm[1]}?background=1&autoplay=1&loop=1&muted=1&dnt=1` };
  return { kind: "file", src: s };
}

export default function HeroVideo({ src }: { src: string }) {
  const v = videoEmbed(src);
  if (!v) return null;
  if (v.kind === "iframe")
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe src={v.src} title="" aria-hidden="true" tabIndex={-1} allow="autoplay; encrypted-media"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0" />
      </div>
    );
  return (
    <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
      <source src={v.src} />
    </video>
  );
}
