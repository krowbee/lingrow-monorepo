"use client";
import { useEffect, useState } from "react";

export function ShowcaseVideo() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = width >= 1024;

  if (!isDesktop) return null;

  return (
    <div className="relative flex max-w-lg overflow-hidden rounded-xl border border-purple-500/25 bg-black/25 p-4 backdrop-blur-sm">
      <div className="absolute h-full w-full bg-black/20 backdrop-blur-xs" />
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
