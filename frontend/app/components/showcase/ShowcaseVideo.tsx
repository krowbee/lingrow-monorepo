"use client";
import { useEffect, useState } from "react";

export function ShowcaseVideo() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width:1024px)");

    const update = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="relative flex max-w-lg rounded-xl border border-purple-500/25 p-4 overflow-hidden bg-black/25 backdrop-blur-sm">
      <div className="absolute w-full h-full bg-black/20 backdrop-blur-xs" />
      <video
        className="h-full w-full rounded-lg object-cover"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        preload="none"
        poster="/videos/poster.webp"
      >
        <source
          src="/videos/loop-video.webm"
          type="video/webm"
          media="(min-width:1024px)"
        />
        <source
          src="/videos/loop-video.mp4"
          type="video/mp4"
          media="(min-width:1024px)"
        />
      </video>
    </div>
  );
}
