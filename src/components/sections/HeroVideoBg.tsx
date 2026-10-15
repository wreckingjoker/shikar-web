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
// Landscape 1920×1080 cut for desktop/tablet, portrait 720×1280 cut for phones. Chosen once
// at mount (not on resize) so a viewport change never triggers a second download.
const DESKTOP_QUERY = '(min-width: 768px)';
// VP9 WebM is ~15% smaller; MP4 (H.264) stays as the fallback for browsers without VP9.
const MEDIA = {
  desktop: { video: '/video/hero-desktop', poster: '/video/hero-desktop-poster.jpg' },
  mobile: { video: '/video/hero', poster: '/video/hero-poster.jpg' },
};

export function HeroVideoBg() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [skipVideo, setSkipVideo] = useState(false);
  const [media] = useState(() =>
    window.matchMedia(DESKTOP_QUERY).matches ? MEDIA.desktop : MEDIA.mobile,
  );

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
          src={media.poster}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          poster={media.poster}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${media.video}.webm`} type='video/webm; codecs="vp9"' />
          <source src={`${media.video}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
