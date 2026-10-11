import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function prefersLightweightMedia() {
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
}

/**
 * Hero background video — Claude.md §2 "no video-heavy hero on mobile without a poster
 * fallback". The poster paints instantly (LCP), the video is a progressive enhancement
 * on top of it, and it's skipped entirely under reduced-motion or Data Saver/slow
 * connections (feature-detected, never user-agent sniffed — Claude.md §11). Canvas-
 * equivalent here: aria-hidden, all real copy stays in Hero.tsx as HTML on top.
 */
export function HeroVideoBg() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [skipVideo, setSkipVideo] = useState(false);

  useEffect(() => {
    setSkipVideo(prefersLightweightMedia());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        /* autoplay can be blocked; poster stays visible either way */
      });
    }
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-ink">
      {skipVideo ? (
        <img
          src="/video/hero-poster.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          poster="/video/hero-poster.jpg"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}
      {/* Keeps the real HTML headline/CTA readable at 4.5:1 regardless of frame brightness */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/25 to-ink" />
      {/* Extra shade right behind the text block — the frames are very bright */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_45%,rgba(18,19,22,0.6),transparent_75%)]" />
    </div>
  );
}
