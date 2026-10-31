import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Download,
  Mail,
  Phone,
} from "lucide-react";

import VideoGallery from "./components/VideoGallery";
import VideoAssistant from "./pages/VideoAssistant";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";

import "./styles/global.css";

function HomePage() {
  return (
    <main>
      <CursorGlow />
      <Navbar />

      {/* HERO */}
      <section className="hero" id="home">
        {/* Vidéo cinématique en arrière-plan */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/hero-background.mp4"
            type="video/mp4"
          />
        </video>

        {/* Voile sombre */}
        <div
          className="hero-overlay"
          aria-hidden="true"
        />

        {/* Grille décorative */}
        <div
          className="hero-grid"
          aria-hidden="true"
        />

        {/* Contenu principal */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="availability">
            <span className="status-dot" />
            ÉTUDIANT INGÉNIEUR · RECHERCHE DE STAGE 3A
          </div>

          {/* Titre animé */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
          >
            <motion.span
              className="title-line"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 70,
                  filter: "blur(10px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.9,
                    ease: "easeOut",
                  },
                },
              }}
            >
              ENGINEERING
            </motion.span>

            <motion.span
              className="title-line outline-text"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 55,
                  filter: "blur(12px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: {
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              MEETS
            </motion.span>

            <motion.span
              className="title-line orange-text"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 55,
                  filter: "blur(12px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: {
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              CREATIVITY.
            </motion.span>
          </motion.h1>

          {/* Description et boutons */}
          <div className="hero-bottom">
            <p className="hero-description">
              Étudiant ingénieur à l'ENSC Bordeaux INP, je développe
              des projets à la croisée de l'intelligence artificielle,
              de la vision par ordinateur et de la création audiovisuelle.
              Je recherche un stage de 3A pour mettre ces compétences en pratique.
            </p>

            <div className="hero-actions">
              <a
                href="#projects"
                className="button-primary"
              >
                Explorer mes projets
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#creative"
                className="button-secondary"
              >
                <Play size={16} />
                Mes vidéos
              </a>

              <a
                href="/CV-Cyriac-Dupouey.pdf"
                download="CV-Cyriac-Dupouey.pdf"
                className="button-secondary"
              >
                <Download size={17} />
                Télécharger mon CV
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="hero-social-links">
              <a
                href="https://github.com/Cyriacccc"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-button"
                aria-label="Consulter mon profil GitHub"
              >
                <ArrowUpRight size={18} />
                <span>GITHUB</span>
                <ArrowUpRight size={15} />
              </a>

              <a
                href="https://www.linkedin.com/in/cyriac-dupouey-341751336/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-button"
                aria-label="Consulter mon profil LinkedIn"
              >
                <ArrowUpRight size={18} />
                <span>LINKEDIN</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Informations en bas de l'écran */}
        <div className="hero-index">
          <span>PORTFOLIO — 2026</span>
          <span>01 / 05</span>
        </div>

        {/* Indicateur de défilement */}
        <a
          href="#projects"
          className="scroll-indicator"
        >
          <ArrowDown size={16} />
          <span>SCROLL TO EXPLORE</span>
        </a>
      </section>

      {/* PROJECTS */}
      <section
        className="projects-section"
        id="projects"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              01 — ENGINEERING
            </span>

            <h2>
              Selected projects<span>.</span>
            </h2>
          </div>

          <p>
            Des idées transformées en projets concrets, entre programmation,
            intelligence artificielle et expérimentation.
          </p>
        </div>

        {/* Projet principal */}
        <motion.article
          className="featured-project"
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="project-visual">
            <div className="visual-overlay" />

            <div className="visual-label">
              <span className="status-dot" />
              PYTHON / COMPUTER VISION
            </div>

            <div className="visual-center">
              <span className="visual-symbol">
                VA.
              </span>

              <span className="visual-caption">
                AUTOMATED VIDEO HIGHLIGHTS
              </span>
            </div>

            <span className="visual-number">
              PROJECT 001
            </span>
          </div>

          <div className="project-information">
            <div className="project-meta">
              <span>PERSONAL PROJECT</span>
              <span>2026</span>
            </div>

            <h3>Video Assistant</h3>

            <p>
              Un outil basé sur Python et la vision par ordinateur,
              conçu pour analyser une vidéo et sélectionner automatiquement
              des séquences potentiellement intéressantes afin de générer
              un Best Of.
            </p>

            <div className="tech-stack">
              <span>Python</span>
              <span>OpenCV</span>
              <span>NumPy</span>
              <span>Video Processing</span>
            </div>

            <div className="hero-actions">
              <Link
                to="/projects/video-assistant"
                className="project-link"
              >
                Découvrir le projet
                <ArrowUpRight size={18} />
              </Link>

              <a
                href="https://video-assistant-qtsm.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Tester l'application
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </motion.article>
      </section>

      {/* CREATIVE */}
      <motion.section
        className="creative-section"
        id="creative"
        initial={{
          opacity: 0,
          y: 45,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <span className="eyebrow">
          02 — CREATIVE
        </span>

        <h2>
          Beyond the code<span>.</span>
        </h2>

        <p>
          Montage vidéo, voyages et création visuelle : découvrez également
          mes projets audiovisuels.
        </p>

        <VideoGallery />

        <a
          href="#contact"
          className="button-secondary"
        >
          Me contacter pour en discuter
          <ArrowUpRight size={18} />
        </a>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        className="about-section"
        id="about"
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <span className="eyebrow">
          03 — ABOUT ME
        </span>

        <h2>
          Technology with a creative mindset.
        </h2>

        <p>
          Étudiant ingénieur à l'ENSC Bordeaux INP, je m'intéresse
          aux applications concrètes de l'informatique, à l'intelligence
          artificielle et au traitement vidéo. J'aime concevoir des outils
          qui associent résolution de problèmes techniques et expérience
          visuelle, de l'analyse automatisée de vidéos au montage audiovisuel.
        </p>

        <a
          href="/CV-Cyriac-Dupouey.pdf"
          download="CV-Cyriac-Dupouey.pdf"
          className="button-secondary"
        >
          <Download size={17} />
          Télécharger mon CV
          <ArrowUpRight size={17} />
        </a>
      </motion.section>

      {/* FOOTER / CONTACT */}
      <footer
        id="contact"
        className="footer"
      >
        <span>
          CYRIAC<span className="orange-text">.</span>
        </span>

        <p>
          Engineering × AI × Visual Creation
        </p>

        <div className="contact-details">
  <a href="mailto:cdupouey@ensc.fr">
    <Mail size={18} />
    <span>cdupouey@ensc.fr</span>
  </a>

  <a href="tel:+330783939893">
    <Phone size={18} />
    <span>07 83 93 98 93</span>
  </a>
</div>
        <small>
          © 2026 — CYRIAC DUPOUEY
        </small>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/projects/video-assistant"
          element={<VideoAssistant />}
        />

        <Route
          path="*"
          element={<HomePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}