"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clearSandboxFiles, registerSandboxWorker } from "./sandbox-files";

/** Demo-Hinweis auf der Website: Änderungen sind nur eine Vorschau dieser Sitzung. */
export default function DemoBar() {
  const path = usePathname();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    void registerSandboxWorker();
  }, []);
  if (path?.startsWith("/admin")) return null;
  const reset = async () => {
    if (!window.confirm("Ihre Vorschau-Änderungen verwerfen?")) return;
    await fetch("/api/sandbox", { method: "DELETE" });
    await clearSandboxFiles();
    window.location.reload();
  };
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 px-3 print:hidden">
      {open ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full bg-neutral-950/90 px-5 py-2.5 text-[12px] text-white shadow-2xl backdrop-blur">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" />Demo-Vorschau · Änderungen sieht nur Ihr Browser</span>
          <a href="/admin" className="font-semibold underline-offset-4 hover:underline">Admin ausprobieren ↗</a>
          <button type="button" onClick={reset} className="text-white/70 hover:text-white">Zurücksetzen</button>
          <button type="button" onClick={() => setOpen(false)} aria-label="Hinweis ausblenden" className="text-white/60 hover:text-white">✕</button>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-neutral-950/90 px-4 py-2 text-[12px] text-white shadow-2xl">Demo</button>
      )}
    </div>
  );
}
