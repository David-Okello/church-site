"use client";

import { useState } from "react";

export default function VideoThumbnail({
  videoId,
  thumb,
  title,
  playSize = 56,
  className = "",
}: {
  videoId: string;
  thumb: string;
  title: string;
  playSize?: number;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: "16 / 9" }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 w-full h-full group cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt={title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-90"
            style={{ background: "rgba(28,24,20,0.22)" }}
          >
            <span
              className="rounded-full grid place-items-center text-white transition-transform group-hover:scale-110"
              style={{ width: playSize, height: playSize, background: "rgba(28,24,20,0.55)" }}
            >
              <span style={{ fontSize: playSize * 0.4 }}>▶</span>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
