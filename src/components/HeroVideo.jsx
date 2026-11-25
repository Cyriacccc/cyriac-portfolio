import { useEffect, useRef, useState } from "react";

const POSTER_SRC = "/hero-poster.webp";
const WEBM_SRC = "/hero-background.webm"; // VP9, ~270 Ko
const MP4_SRC = "/hero-background.mp4"; // H.264 de secours, ~470 Ko

// La vidéo n'est chargée que sur grand écran, sans préférence
// « réduire les animations » ni mode économie de données.
// Sinon, seule l'image poster est affichée.
function shouldPlayVideo() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const saveData = navigator.connection?.saveData === true;

  return !(reducedMotion || smallScreen || saveData);
}

export default function HeroVideo() {
  const videoRef = useRef(null);
  // Décidé après l'affichage : le HTML prérendu (sans vidéo) et le premier
  // rendu côté navigateur restent identiques.
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!shouldPlayVideo()) return;
    const canPlayWebm = videoRef.current?.canPlayType('video/webm; codecs="vp9"');
    setSrc(canPlayWebm ? WEBM_SRC : MP4_SRC);
  }, []);

  // La source arrive après le montage : on lance la lecture explicitement.
  useEffect(() => {
    if (src) videoRef.current?.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      src={src ?? undefined}
      poster={POSTER_SRC}
      autoPlay={Boolean(src)}
      muted
      loop
      playsInline
      preload={src ? "auto" : "none"}
      aria-hidden="true"
    />
  );
}
