"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoPanel({
  src,
  poster,
  className = "",
  label,
}) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = muted;
    const play = el.play();
    if (play?.catch) play.catch(() => {});
  }, [muted, src]);

  return (
    <div className={`group relative overflow-hidden bg-forest-deep ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
        autoPlay
        muted={muted}
        loop
        playsInline
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
      {label && (
        <p className="absolute bottom-3 left-3 text-xs tracking-[0.18em] text-cream/90 uppercase">
          {label}
        </p>
      )}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="absolute right-3 bottom-3 rounded-full border border-cream/30 bg-forest-deep/50 px-3 py-1 text-[11px] font-medium tracking-wide text-cream backdrop-blur-sm transition duration-300 hover:bg-forest-deep/80"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? "Sound off" : "Sound on"}
      </button>
    </div>
  );
}
