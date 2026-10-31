import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight } from "lucide-react";
import "../styles/global.css";

const videos = [
  {
    id: "video-1",
    title: "Cancun",
    category: "Travel Film",
    description: "Cancun pendant la coupe du monde",
    youtubeId: "Wjgg3IM3MlQ",
    number: "01",
  },
  {
    id: "video-2",
    title: "MIAMI",
    category: "Cinematic Travel",
    description: "Une destination, une atmosphère.",
    youtubeId: "oRZ5p8ILF6Q",
    number: "02",
  },
  {
    id: "video-3",
    title: "New York",
    category: "Creative Editing",
    description: "Fast Life in NYC",
    youtubeId: "so7wb61BT94",
    number: "03",
  },
];

const editingSteps = {
  "video-1": [
    {
      number: "01",
      title: "TRANSITIONS",
      subtitle: "Connecting the shots",
      description:
        "Les transitions permettent de relier les plans et de maintenir la continuité visuelle du film. L'objectif est de créer un enchaînement fluide qui accompagne le spectateur dans le voyage.",
      tag: "EDITING",
    },
    {
      number: "02",
      title: "COLOR GRADING",
      subtitle: "Building the atmosphere",
      description:
        "Le travail colorimétrique contribue à donner une identité visuelle au film. Les couleurs, les contrastes et la luminosité participent à l'atmosphère générale des images.",
      tag: "COLOR",
    },
    {
      number: "03",
      title: "MUSIC SYNC",
      subtitle: "Editing to the rhythm",
      description:
        "La synchronisation entre les images et la musique contribue au rythme du montage. Les changements de plans et les temps forts musicaux participent à la dynamique du film.",
      tag: "AUDIO",
    },
    {
      number: "04",
      title: "MOTION & TITLES",
      subtitle: "Adding visual identity",
      description:
        "Les titres et les animations permettent d'ajouter des informations et de renforcer l'identité visuelle du projet, tout en restant cohérents avec l'ambiance du film.",
      tag: "MOTION",
    },
  ],

  "video-2": [
    {
      number: "01",
      title: "AI VIDEO GENERATION",
      subtitle: "Imagining new visuals",
      description:
        "Pour le film de Miami, j'ai utilisé Highfield.ai, ainsi que d'autres outils de génération par intelligence artificielle, pour créer des séquences visuelles qui enrichissent le récit du voyage. L'objectif est d'explorer de nouvelles possibilités créatives au-delà des images capturées sur place.",
      tag: "GENERATIVE AI",
    },
    {
      number: "02",
      title: "AI ANIMATIONS",
      subtitle: "Bringing ideas to life",
      description:
        "J'ai également exploré différents outils d'IA pour créer des animations et donner du mouvement à des éléments visuels. Ces séquences permettent d'introduire des effets créatifs et de renforcer l'identité visuelle du montage.",
      tag: "AI ANIMATION",
    },
    {
      number: "03",
      title: "CINEMATIC EDITING",
      subtitle: "Building the visual story",
      description:
        "Les séquences filmées et les contenus générés par IA sont intégrés dans un montage cohérent. Le choix des plans, le rythme et les transitions permettent de construire une expérience visuelle fluide.",
      tag: "EDITING",
    },
    {
      number: "04",
      title: "MUSIC & ATMOSPHERE",
      subtitle: "Creating the final mood",
      description:
        "Le rythme musical, les contrastes et le traitement des images contribuent à créer une atmosphère cinématographique. Chaque élément est pensé pour renforcer l'immersion et accompagner le spectateur tout au long du film.",
      tag: "SOUND & COLOR",
    },
  ],

  "video-3": [
    {
      number: "01",
      title: "SHOT SELECTION",
      subtitle: "Finding the right moments",
      description:
        "La première étape consiste à sélectionner les plans les plus pertinents pour retranscrire l'énergie de New York. Les mouvements de caméra, les scènes urbaines et les changements de rythme contribuent à construire l'identité du film.",
      tag: "STORYTELLING",
    },
    {
      number: "02",
      title: "FAST-PACED EDITING",
      subtitle: "Capturing the city's energy",
      description:
        "Le montage joue sur la durée des plans, les enchaînements et les variations de rythme pour retranscrire le dynamisme de la ville. L'objectif est de maintenir l'attention tout en conservant une progression visuelle cohérente.",
      tag: "EDITING",
    },
    {
      number: "03",
      title: "MUSIC SYNC",
      subtitle: "Editing to the beat",
      description:
        "La synchronisation entre les images et la musique structure le montage. Les changements de plans et les temps forts sonores participent à l'énergie générale de la vidéo.",
      tag: "AUDIO",
    },
    {
      number: "04",
      title: "VISUAL CONSISTENCY",
      subtitle: "Shaping the final look",
      description:
        "Le travail sur les couleurs, les contrastes et les transitions permet d'unifier les différents plans et de donner au film une identité visuelle cohérente.",
      tag: "COLOR & FINISH",
    },
  ],
};
/* =========================================
   INTERFACE ILLUSTRATIVE — DAVINCI RESOLVE
========================================= */

function DaVinciIllustration({ video }) {
  const isMiami = video.id === "video-2";
  const isNewYork = video.id === "video-3";

  const clips = isMiami
    ? [
        { label: "CITY", color: "clip-blue" },
        { label: "AI SHOT", color: "clip-purple" },
        { label: "PALMS", color: "clip-orange" },
        { label: "CITY", color: "clip-blue" },
        { label: "AI SHOT", color: "clip-purple" },
      ]
    : isNewYork
      ? [
          { label: "STREET", color: "clip-blue" },
          { label: "CITY", color: "clip-orange" },
          { label: "NIGHT", color: "clip-purple" },
          { label: "STREET", color: "clip-blue" },
          { label: "CITY", color: "clip-orange" },
        ]
      : [
          { label: "BEACH", color: "clip-blue" },
          { label: "DRONE", color: "clip-orange" },
          { label: "TRAVEL", color: "clip-purple" },
          { label: "OCEAN", color: "clip-blue" },
          { label: "BEACH", color: "clip-orange" },
        ];

  const cameras = [
    { name: "DJI Osmo Pocket 3", type: "CAMERA / 01", icon: "▣" },
    { name: "DJI Osmo Action 4", type: "ACTION CAM / 02", icon: "◉" },
    { name: "DJI Flip 4", type: "DRONE / 03", icon: "✳" },
  ];

  return (
    <section
      className="davinci-illustration"
      aria-label={`Illustration du workflow de post-production de ${video.title}`}
    >
      {/* TITRE */}
      <div className="davinci-heading">
        <div>
          <span className="davinci-eyebrow">
            <span className="davinci-status-dot" />
            CREATIVE WORKFLOW / POST-PRODUCTION
          </span>

          <h3>
            BEHIND
            <br />
            THE FILM<span className="davinci-heading-dot">.</span>
          </h3>
        </div>

        <div className="davinci-heading-description">
          <strong>{video.title} — {video.category}</strong>
          <span>From raw footage to final look.</span>
          <span>Montage vidéo · Color grading</span>
        </div>
      </div>

      {/* INTERFACE DE MONTAGE + COLOR GRADING */}
      <div className="davinci-workspace">
        {/* TIMELINE */}
        <div className="davinci-screen davinci-edit-screen">
          <div className="davinci-screen-topbar">
            <span className="davinci-window-dots">
              <i />
              <i />
              <i />
            </span>

            <span>EDIT PAGE</span>
            <span className="davinci-timecode">00:00:12:08</span>
          </div>

          <div className="davinci-preview">
            <div className={`davinci-preview-scene scene-${video.id}`}>
              <span>{video.title.toUpperCase()}</span>
              <small>FINAL CUT / PREVIEW</small>
            </div>
          </div>

          <div className="davinci-ruler">
            <span>00:00</span>
            <span>00:05</span>
            <span>00:10</span>
            <span>00:15</span>
            <span>00:20</span>
          </div>

          <div className="davinci-timeline">
            <div className="davinci-track-label">V2</div>

            <div className="davinci-track davinci-track-titles">
              <div className="davinci-title-clip">
                TITLES / GRAPHICS
              </div>
            </div>

            <div className="davinci-track-label">V1</div>

            <div className="davinci-track davinci-track-video">
              {clips.map((clip, index) => (
                <div
                  key={`${clip.label}-${index}`}
                  className={`davinci-clip ${clip.color}`}
                  style={{
                    flex: index === 2 ? 1.3 : index === 1 ? 0.8 : 1,
                  }}
                >
                  <span>{clip.label}</span>
                </div>
              ))}
            </div>

            <div className="davinci-track-label">A1</div>

            <div className="davinci-track davinci-track-audio">
              <div className="davinci-audio-wave">
                {Array.from({ length: 65 }).map((_, index) => (
                  <i
                    key={index}
                    style={{
                      height: `${4 + ((index * 17 + 11) % 17)}px`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="davinci-playhead" />
          </div>

          <div className="davinci-screen-footer">
            <span>01 / EDITING TIMELINE</span>
            <span>ASSEMBLY · RHYTHM · AUDIO</span>
          </div>
        </div>

        {/* COLOR GRADING */}
        <div className="davinci-screen davinci-color-screen">
          <div className="davinci-screen-topbar">
            <span>COLOR</span>
            <span className="davinci-timecode">PRIMARY CORRECTION</span>
          </div>

          <div className="davinci-color-preview">
            <div className={`davinci-color-scene scene-${video.id}`} />
            <span>COLOR MANAGEMENT / FINAL LOOK</span>
          </div>

          <div className="davinci-wheels">
            {[
              { name: "LIFT", description: "Shadows" },
              { name: "GAMMA", description: "Midtones" },
              { name: "GAIN", description: "Highlights" },
            ].map((wheel) => (
              <div className="davinci-wheel-wrap" key={wheel.name}>
                <div className={`davinci-wheel wheel-${wheel.name.toLowerCase()}`}>
                  <div className="davinci-wheel-center" />
                </div>

                <strong>{wheel.name}</strong>
                <span>{wheel.description}</span>
              </div>
            ))}
          </div>

          <div className="davinci-color-controls">
            {[
              { label: "Temperature", value: "42%" },
              { label: "Tint", value: "58%" },
              { label: "Contrast", value: "66%" },
              { label: "Saturation", value: "74%" },
            ].map((control) => (
              <div className="davinci-control" key={control.label}>
                <span>{control.label}</span>

                <div className="davinci-control-track">
                  <i style={{ left: control.value }} />
                </div>
              </div>
            ))}
          </div>

          <div className="davinci-screen-footer">
            <span>02 / COLOR GRADING</span>
            <span>COLOR · CONTRAST · MOOD</span>
          </div>
        </div>
      </div>

      {/* AVANT / APRÈS */}
      <div className="davinci-before-after">
        <div className={`davinci-before-after-image scene-${video.id}`}>
          <div className="davinci-before">
            <span>BEFORE</span>
            <small>RAW FOOTAGE</small>
          </div>

          <div className="davinci-after">
            <span>AFTER</span>
            <small>COLOR GRADED</small>
          </div>

          <div className="davinci-before-after-divider">
            <span>↔</span>
          </div>
        </div>

        <div className="davinci-before-after-copy">
          <span className="davinci-mini-label">03 / FINAL LOOK</span>
          <h4>FROM RAW TO CINEMATIC.</h4>

          <p>
            Le travail colorimétrique permet d'harmoniser les plans,
            de renforcer les contrastes et de donner au film son
            atmosphère visuelle.
          </p>
        </div>
      </div>

      {/* OUTILS ET MATÉRIEL */}
      <div className="davinci-bottom-grid">
        <div className="davinci-info-card">
          <span className="davinci-mini-label">
            CAMERA GEAR / 01—03
          </span>

          <h4>CAPTURE THE MOMENT.</h4>

          <div className="davinci-camera-list">
            {cameras.map((camera) => (
              <div className="davinci-camera-item" key={camera.name}>
                <span className="davinci-camera-icon">{camera.icon}</span>

                <span className="davinci-camera-type">
                  {camera.type}
                </span>

                <strong>{camera.name}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="davinci-info-card davinci-software-card">
          <span className="davinci-mini-label">
            SOFTWARE & CREATIVE TOOLS
          </span>

          <h4>TOOLS BEHIND THE FILM.</h4>

          <div className="davinci-software-list">
            <div className="davinci-software-item">
              <div className="davinci-resolve-icon">
                <i />
                <i />
                <i />
              </div>

              <strong>DaVinci Resolve</strong>
              <span>EDITING & COLOR</span>
            </div>

            {isMiami && (
              <a
                href="https://highfield.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="davinci-ai-tool"
              >
                <div className="davinci-ai-icon">AI</div>

                <strong>Highfield.ai</strong>
                <span>AI VIDEO GENERATION ↗</span>
              </a>
            )}

            {!isMiami && (
              <div className="davinci-other-tools">
                <div className="davinci-other-tools-icon">✳</div>
                <strong>Creative tools</strong>
                <span>STORYTELLING & MOTION</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BANDEAU DE SYNTHÈSE */}
      <div className="davinci-workflow-footer">
        <span>▣</span>
        <span>VIDEO EDITING</span>
        <i />
        <span>COLOR GRADING</span>
        <i />
        <span>{isMiami ? "GENERATIVE AI" : "STORYTELLING"}</span>
        <i />
        <span>FINAL CUT</span>
      </div>
    </section>
  );
}

function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [breakdownVideo, setBreakdownVideo] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const currentSteps = breakdownVideo
    ? editingSteps[breakdownVideo.id] || editingSteps["video-1"]
    : [];

  useEffect(() => {
    const isModalOpen =
      selectedVideo !== null || breakdownVideo !== null;

    if (!isModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
        setBreakdownVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo, breakdownVideo]);

  const openBreakdown = (video) => {
    setActiveStep(0);
    setBreakdownVideo(video);
  };

  const closeBreakdown = () => {
    setBreakdownVideo(null);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="video-gallery section" id="video-gallery">
      <div className="video-gallery-inner">
        {/* EN-TÊTE */}
        <motion.div
          className="video-gallery-heading"
          initial={{ opacity: 0, y: 45, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div>
            <span className="video-gallery-eyebrow">
              <span className="gallery-dot" />
              CREATIVE PORTFOLIO / 002
            </span>

            <h2>
              BEYOND THE
              <br />
              <span>FRAME.</span>
            </h2>
          </div>

          <p className="video-gallery-intro">
            Des voyages aux projets personnels, j’explore le montage vidéo
            comme un moyen de raconter des histoires et de créer des émotions.
          </p>
        </motion.div>

        {/* GALERIE */}
        <div className="video-gallery-grid">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className={`video-card-wrapper ${
                index === 0 ? "video-card-wrapper-featured" : ""
              }`}
              initial={{
                opacity: 0,
                y: 90,
                scale: 0.92,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 1.1,
                delay: index * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.button
                type="button"
                className={`video-card ${
                  index === 0 ? "video-card-featured" : ""
                }`}
                onClick={() => setSelectedVideo(video)}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x =
                    (event.clientX - rect.left) / rect.width - 0.5;
                  const y =
                    (event.clientY - rect.top) / rect.height - 0.5;

                  event.currentTarget.style.setProperty(
                    "--pointer-x",
                    `${x * 10}px`
                  );
                  event.currentTarget.style.setProperty(
                    "--pointer-y",
                    `${y * 10}px`
                  );
                }}
                onMouseLeave={(event) => {
                  setHoveredVideo(null);
                  event.currentTarget.style.setProperty("--pointer-x", "0px");
                  event.currentTarget.style.setProperty("--pointer-y", "0px");
                }}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                whileTap={{ scale: 0.985 }}
                aria-label={`Lire la vidéo ${video.title}`}
              >
                <div className="video-card-image">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={`Miniature de ${video.title}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                    style={{
                      opacity: hoveredVideo === video.id ? 0 : 1,
                    }}
                  />

                  {hoveredVideo === video.id && (
                    <iframe
                      className="video-hover-preview"
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.youtubeId}&playsinline=1&rel=0`}
                      title={`Aperçu de ${video.title}`}
                      allow="autoplay; encrypted-media"
                      tabIndex={-1}
                    />
                  )}

                  <div className="video-card-overlay" />

                  <motion.span
                    className="video-card-number"
                    animate={{
                      y: hoveredVideo === video.id ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {video.number}
                  </motion.span>

                  {/* Pas de bouton Play visible au survol */}
                  <motion.span
                    className="video-card-play"
                    animate={{
                      opacity: hoveredVideo === video.id ? 0 : 1,
                      scale: hoveredVideo === video.id ? 0.7 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  >
                    <Play size={21} fill="currentColor" />
                  </motion.span>

                  <span className="video-card-open">
                    <ArrowUpRight size={19} />
                  </span>

                  <motion.div
                    className="video-card-content"
                    animate={{
                      y: hoveredVideo === video.id ? -8 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="video-card-category">
                      {video.category}
                    </span>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </motion.div>
                </div>
              </motion.button>

              {/* EXPLORE THE PROCESS POUR LES TROIS VIDÉOS */}
              <motion.button
                type="button"
                className="video-breakdown-trigger"
                onClick={() => openBreakdown(video)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Découvrir le processus de création de ${video.title}`}
              >
                <span className="video-breakdown-trigger-number">
                  {video.number} / BEHIND THE FILM
                </span>

                <span className="video-breakdown-trigger-label">
                  EXPLORE THE PROCESS
                </span>

                <ArrowUpRight size={19} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* PIED DE GALERIE */}
        <motion.div
          className="video-gallery-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>SELECTED WORKS</span>
          <span>VIDEO EDITING · STORYTELLING · COLOR GRADING</span>
        </motion.div>
      </div>

      {/* LECTEUR VIDÉO */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="video-modal-content"
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 40,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
                filter: "blur(5px)",
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Lecteur vidéo : ${selectedVideo.title}`}
            >
              <button
                type="button"
                className="video-modal-close"
                onClick={closeVideo}
                aria-label="Fermer la vidéo"
              >
                <X size={24} />
              </button>

              <div className="video-modal-player">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="video-modal-caption">
                <div>
                  <span>{selectedVideo.category}</span>
                  <motion.h3
                    key={selectedVideo.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    {selectedVideo.title}
                  </motion.h3>
                </div>
                <p>{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FENÊTRE INTERACTIVE : PROCESSUS DE CRÉATION */}
      <AnimatePresence>
        {breakdownVideo && (
          <motion.div
            className="breakdown-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBreakdown}
          >
            <motion.div
              className="breakdown-panel"
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Behind the Film — ${breakdownVideo.title}`}
            >
              <button
                type="button"
                className="breakdown-close"
                onClick={closeBreakdown}
                aria-label="Fermer le breakdown"
              >
                <X size={23} />
              </button>

              {/* EN-TÊTE */}
              <div className="breakdown-header">
                <motion.span
                  className="breakdown-eyebrow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  CREATIVE PROCESS / {breakdownVideo.number}
                </motion.span>

                <h2>
                  BEHIND
                  <br />
                  <span>THE FILM.</span>
                </h2>

                <p>
                  {breakdownVideo.title} — {breakdownVideo.category}
                  <br />
                  Exploring the creative process behind the final cut.
                </p>
              </div>

              {/* LECTEUR DU FILM SÉLECTIONNÉ */}
              <div className="breakdown-film">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${breakdownVideo.youtubeId}?rel=0&playsinline=1`}
                  title={`${breakdownVideo.title} — ${breakdownVideo.category}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                <span className="breakdown-film-label">
                  FINAL CUT / {breakdownVideo.title.toUpperCase()}
                </span>
              </div>

              {/* TIMELINE INTERACTIVE */}
              <div className="breakdown-process">
                <div className="breakdown-process-heading">
                  <span>THE WORKFLOW</span>
                  <span>
                    {String(activeStep + 1).padStart(2, "0")} /{" "}
                    {String(currentSteps.length).padStart(2, "0")}
                  </span>
                </div>
                              

                <div
                  className="breakdown-timeline"
                  role="tablist"
                  aria-label={`Étapes du montage de ${breakdownVideo.title}`}
                >
                  {currentSteps.map((step, index) => (
                    <button
                      type="button"
                      key={`${breakdownVideo.id}-${step.number}`}
                      role="tab"
                      aria-selected={activeStep === index}
                      className={`breakdown-step ${
                        activeStep === index ? "is-active" : ""
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <span className="breakdown-step-top">
                        <span>{step.number}</span>
                        <span className="breakdown-step-dot" />
                      </span>

                      <span className="breakdown-step-title">
                        {step.title}
                      </span>

                      <span className="breakdown-step-line" />
                    </button>
                  ))}
                </div>

                {/* DESCRIPTION ANIMÉE */}
                <div className="breakdown-description">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${breakdownVideo.id}-${activeStep}`}
                      initial={{
                        opacity: 0,
                        y: 12,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        filter: "blur(3px)",
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="breakdown-description-tag">
                        {currentSteps[activeStep].tag}
                      </span>

                      <h3>{currentSteps[activeStep].subtitle}</h3>

                      <p>{currentSteps[activeStep].description}</p>

                      {/* MISE EN AVANT DE L'OUTIL IA POUR MIAMI */}
                      {breakdownVideo.id === "video-2" &&
                        activeStep === 0 && (
                          <a
                            href="https://highfield.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-breakdown-trigger"
                            style={{
                              display: "inline-flex",
                              width: "fit-content",
                              marginTop: "18px",
                            }}
                          >
                            DISCOVER HIGHFIELD.AI
                            <ArrowUpRight size={17} />
                          </a>
                        )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="breakdown-navigation">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep((current) =>
                          current === 0
                            ? currentSteps.length - 1
                            : current - 1
                        )
                      }
                    >
                      ← PREVIOUS
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep(
                          (current) => (current + 1) % currentSteps.length
                        )
                      }
                    >
                      NEXT STEP →
                    </button>
                  </div>
                </div>
              </div>
              <DaVinciIllustration video={breakdownVideo} />

              {/* FICHE TECHNIQUE */}
              <div className="breakdown-footer">
                <div>
                  <span className="breakdown-footer-label">PROJECT</span>
                  <span>{breakdownVideo.category}</span>
                </div>

                <div>
                  <span className="breakdown-footer-label">SOFTWARE</span>
                  <span>
                    {breakdownVideo.id === "video-2"
                      ? "Video editing · AI tools"
                      : "DaVinci Resolve"}
                  </span>
                </div>

                <div>
                  <span className="breakdown-footer-label">FOCUS</span>
                  <span>
                    {breakdownVideo.id === "video-2"
                      ? "AI · Animation · Editing"
                      : "Editing · Color · Motion"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default VideoGallery;