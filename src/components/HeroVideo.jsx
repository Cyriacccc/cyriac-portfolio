import { useState } from "react";

const VIDEO_SRC = "/hero-background.mp4";
const POSTER_SRC = "/hero-poster.webp";

// La vidéo (4 Mo) n'est chargée que sur grand écran, sans préférence
// « réduire les animations » ni mode économie de données.
// Sinon, seule l'image poster est affichée.
function shouldPlayVideo() {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallScreen = window.matchMedia("(max-width: 768px)").matches;
  const saveData = navigator.connection?.saveData === true;

  return !(reducedMotion || smallScreen || saveData);
}

export default function HeroVideo() {
  const [enabled] = useState(shouldPlayVideo);

  return (
    <video
      className="hero-video"
      src={enabled ? VIDEO_SRC : undefined}
      poster={POSTER_SRC}
      autoPlay={enabled}
      muted
      loop
      playsInline
      preload={enabled ? "auto" : "none"}
      aria-hidden="true"
    />
  );
}
