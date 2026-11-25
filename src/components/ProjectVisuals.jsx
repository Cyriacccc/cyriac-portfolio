import { useEffect, useRef, useState } from "react";

/*
 * Animations SVG des cartes projet de l'accueil.
 * - Animations en CSS (voir « ANIMATIONS DES CARTES PROJET » dans global.css)
 * - Mises en pause hors de l'écran, figées si « réduire les animations »
 */

// Met l'animation en pause quand la carte n'est pas visible.
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "100px",
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/* VIDEO ASSISTANT : score de mouvement, seuil et moments forts        */
/* ------------------------------------------------------------------ */

const VA_DURATION = 6; // secondes par passage de la tête de lecture
const CHART_TOP = 92;
const CHART_BOTTOM = 232;
const THRESHOLD_Y = 150;

// Signal déterministe : bruit de fond + deux pics (les moments forts)
const peak = (x, center, width, height) => height * Math.exp(-(((x - center) / width) ** 2));
const signal = Array.from({ length: 81 }, (_, i) => {
  const x = i * 5;
  const noise = 10 * Math.sin(x * 0.11) + 6 * Math.sin(x * 0.27 + 1.3) + 4 * Math.sin(x * 0.53);
  const value = 28 + noise + peak(x, 150, 32, 95) + peak(x, 275, 16, 78);
  return [x, Math.max(CHART_TOP + 6, CHART_BOTTOM - value)];
});
const linePoints = signal.map(([x, y]) => `${x},${y.toFixed(1)}`).join(" ");
const areaPoints = `0,${CHART_BOTTOM} ${linePoints} 400,${CHART_BOTTOM}`;

const FRAMES = Array.from({ length: 8 }, (_, i) => {
  const x = 5 + i * 50;
  const center = x + 20;
  const y = signal[Math.round(center / 5)][1];
  return { x, center, highlight: y < THRESHOLD_Y };
});

export function VideoAssistantVisual() {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`pv pv-va ${inView ? "" : "is-paused"}`} aria-hidden="true">
      <svg viewBox="0 0 400 250" role="presentation">
        <defs>
          <clipPath id="va-above-threshold">
            <rect x="0" y="0" width="400" height={THRESHOLD_Y} />
          </clipPath>
          <linearGradient id="va-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5c20" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff5c20" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Bande d'images de la vidéo */}
        {FRAMES.map((frame) => (
          <g key={frame.x}>
            <rect className="pv-frame" x={frame.x} y="14" width="40" height="28" rx="3" />
            {frame.highlight && (
              <rect
                className="pv-frame-hit"
                x={frame.x}
                y="14"
                width="40"
                height="28"
                rx="3"
                style={{ animationDelay: `${(frame.center / 400) * VA_DURATION}s` }}
              />
            )}
          </g>
        ))}
        <text className="pv-mono" x="0" y="62">IMAGES</text>
        <text className="pv-mono pv-accent" x="400" y="62" textAnchor="end">MOMENTS FORTS</text>

        {/* Courbe du score de mouvement */}
        <line className="pv-axis" x1="0" y1={CHART_BOTTOM} x2="400" y2={CHART_BOTTOM} />
        <polygon className="pv-area" points={areaPoints} clipPath="url(#va-above-threshold)" />
        <polyline className="pv-line" points={linePoints} />
        <line className="pv-threshold" x1="0" y1={THRESHOLD_Y} x2="400" y2={THRESHOLD_Y} />
        <text className="pv-mono" x="0" y={THRESHOLD_Y - 6}>SEUIL</text>
        <text className="pv-mono" x="0" y="248">SCORE DE MOUVEMENT</text>

        {/* Tête de lecture */}
        <g className="pv-playhead" style={{ animationDuration: `${VA_DURATION}s` }}>
          <line x1="0" y1="8" x2="0" y2={CHART_BOTTOM} />
          <circle cx="0" cy={CHART_BOTTOM} r="3.5" />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DISPUTE AGENT : négociation entre agents, accord puis jury          */
/* ------------------------------------------------------------------ */

const NODES = {
  a: { x: 70, y: 140, label: "PARTIE A" },
  b: { x: 330, y: 140, label: "PARTIE B" },
  m: { x: 200, y: 48, label: "MÉDIATEUR" },
};

// Messages échangés (départ, arrivée, moment du départ en secondes sur 8 s)
const MESSAGES = [
  ["a", "b", 0],
  ["b", "a", 1.1],
  ["m", "a", 2.2],
  ["m", "b", 2.2],
  ["a", "b", 3.3],
  ["b", "a", 4.4],
];

export function DisputeAgentVisual() {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`pv pv-da ${inView ? "" : "is-paused"}`} aria-hidden="true">
      <svg viewBox="0 0 400 250" role="presentation">
        {/* Liens entre agents */}
        <line className="pv-edge pv-edge-main" x1={NODES.a.x} y1={NODES.a.y} x2={NODES.b.x} y2={NODES.b.y} />
        <line className="pv-edge" x1={NODES.m.x} y1={NODES.m.y} x2={NODES.a.x} y2={NODES.a.y} />
        <line className="pv-edge" x1={NODES.m.x} y1={NODES.m.y} x2={NODES.b.x} y2={NODES.b.y} />
        <path className="pv-edge pv-edge-jury" d="M70 166 Q 90 222 168 222 M330 166 Q 310 222 232 222" />

        {/* Messages */}
        {MESSAGES.map(([from, to, delay], i) => (
          <circle
            key={i}
            className={`pv-msg ${from === "m" ? "pv-msg-mediator" : ""}`}
            cx={NODES[from].x}
            cy={NODES[from].y}
            r="4.5"
            style={{
              "--dx": `${NODES[to].x - NODES[from].x}px`,
              "--dy": `${NODES[to].y - NODES[from].y}px`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}

        {/* Agents */}
        {Object.entries(NODES).map(([key, node]) => (
          <g key={key}>
            <circle className={`pv-node ${key === "m" ? "pv-node-mediator" : "pv-node-party"}`} cx={node.x} cy={node.y} r={key === "m" ? 20 : 25} />
            <text className="pv-node-letter" x={node.x} y={node.y + 4.5} textAnchor="middle">
              {key.toUpperCase()}
            </text>
            <text className="pv-mono" x={node.x} y={key === "m" ? node.y - 28 : node.y + 42} textAnchor="middle">
              {node.label}
            </text>
          </g>
        ))}

        {/* Accord */}
        <g className="pv-agreement">
          <rect x="156" y="124" width="88" height="24" rx="12" />
          <text className="pv-mono" x="200" y="140" textAnchor="middle">✓ ACCORD</text>
        </g>

        {/* Jury de trois LLM */}
        {[180, 200, 220].map((x, i) => (
          <circle key={x} className="pv-judge" cx={x} cy="222" r="6.5" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        <text className="pv-mono" x="200" y="246" textAnchor="middle">JURY DE LLM</text>
      </svg>
    </div>
  );
}
