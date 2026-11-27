import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { m, MotionConfig, LazyMotion, domAnimation } from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Download,
  Mail,
  Phone,
} from "lucide-react";

import { lazy, Suspense } from "react";

import VideoGallery from "./components/VideoGallery";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import HeroVideo from "./components/HeroVideo";
import { VideoAssistantVisual, DisputeAgentVisual } from "./components/ProjectVisuals";
import { GithubIcon, LinkedinIcon } from "./components/BrandIcons";
import PortfolioAssistant from "./components/PortfolioAssistant";
import { skills } from "./data/skills";

// Pages projet chargées seulement quand on les ouvre (JS séparé).
// Leur contenu est dans src/data/projects.js.
const ProjectPage = lazy(() => import("./pages/ProjectPage"));

import "./styles/global.css";

function HomePage() {
  return (
    <main>
      <CursorGlow />
      <Navbar />

      {/* HERO */}
      <section className="hero" id="home">
        {/* Vidéo cinématique en arrière-plan, avec bouton pause */}
        <HeroVideo />

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
        <m.div
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
            ÉLÈVE INGÉNIEUR IA · STAGE DE FIN D'ÉTUDES DÈS FÉVRIER 2027
          </div>

          {/* Titre animé */}
          <m.h1
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
            <m.span
              className="hero-name"
              translate="no"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" },
                },
              }}
            >
              Cyriac Dupouey
            </m.span>
            <span className="visually-hidden"> — </span>

            <m.span
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
            </m.span>

            <m.span
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
            </m.span>

            <m.span
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
            </m.span>
          </m.h1>

          {/* Description et boutons */}
          <div className="hero-bottom">
            <p className="hero-description">
              Élève ingénieur en dernière année à l'ENSC Bordeaux INP,
              spécialité Intelligence Artificielle. Passionné par le machine
              learning et les LLM, je recherche un stage de fin d'études de
              6 mois en IA / machine learning à partir de février 2027.
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
                <GithubIcon size={16} />
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
                <LinkedinIcon size={16} />
                <span>LINKEDIN</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </m.div>

        {/* Informations en bas de l'écran */}
        <div className="hero-index">
          <span>PORTFOLIO — 2026</span>
          <span>BORDEAUX · FRANCE</span>
        </div>

        {/* Indicateur de défilement */}
        <a
          href="#projects"
          className="scroll-indicator"
        >
          <ArrowDown size={16} />
          <span>DÉFILER POUR EXPLORER</span>
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
              01 — INGÉNIERIE
            </span>

            <h2>
              Projets sélectionnés<span>.</span>
            </h2>
          </div>

          <p>
            Des idées transformées en projets concrets, des agents basés
            sur les LLM au traitement automatique de vidéos.
          </p>
        </div>

        {/* Projet principal */}
        <m.article
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
              PYTHON / VISION PAR ORDINATEUR
            </div>

            <div className="visual-center visual-center-anim">
              <VideoAssistantVisual />
              <span className="visual-caption">MOMENTS FORTS AUTOMATIQUES</span>
            </div>

            <span className="visual-number">
              PROJET 001
            </span>
          </div>

          <div className="project-information">
            <div className="project-meta">
              <span>PROJET PERSONNEL</span>
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
              <span>Traitement vidéo</span>
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

            <p className="project-note">
              Application hébergée gratuitement sur Render : le premier
              chargement peut prendre environ une minute.
            </p>
          </div>
        </m.article>

        {/* Dispute Agent — stage recherche au Laboratoire de Cyberjustice */}
        <m.article
          className="featured-project"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-visual">
            <div className="visual-overlay" />

            <div className="visual-label">
              <span className="status-dot" />
              LLM / SYSTÈMES MULTI-AGENTS
            </div>

            <div className="visual-center visual-center-anim">
              <DisputeAgentVisual />
              <span className="visual-caption">RECHERCHE EN MÉDIATION IA</span>
            </div>

            <span className="visual-number">PROJET 002</span>
          </div>

          <div className="project-information">
            <div className="project-meta">
              <span>STAGE RECHERCHE · CYBERJUSTICE</span>
              <span>2026</span>
            </div>

            <h3>Dispute Agent</h3>

            <p>
              Framework de simulation multi-agents développé au Laboratoire
              de Cyberjustice (Montréal) : des agents LLM négocient un litige,
              avec ou sans médiateur IA, puis un jury de trois LLM évalue la
              qualité de la médiation. Sur 90 négociations pilotes, la
              médiation améliore nettement la qualité des accords.
            </p>

            <div className="tech-stack">
              <span>Python</span>
              <span>LLM</span>
              <span>Multi-agents</span>
              <span>FastAPI</span>
            </div>

            <div className="hero-actions">
              <Link to="/projects/dispute-agent" className="project-link">
                Découvrir le projet
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </m.article>

      </section>

      {/* COMPÉTENCES */}
      <m.section
        className="skills-section"
        id="skills"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 — COMPÉTENCES</span>

            <h2>
              Compétences<span>.</span>
            </h2>
          </div>

          <p>
            Les outils et méthodes que j'utilise, de la conception d'agents
            basés sur des LLM au machine learning.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group, index) => (
            <article className="skill-card" key={group.title}>
              <span className="skill-card-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <ul className="skill-tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </m.section>

      {/* CREATIVE */}
      <m.section
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
          03 — CRÉATIF
        </span>

        <h2>
          Au-delà du code<span>.</span>
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
      </m.section>

      {/* ABOUT */}
      <m.section
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
          04 — À PROPOS
        </span>

        <h2>
          La technologie, avec un regard créatif.
        </h2>

        <p>
          Étudiant ingénieur en dernière année à l'ENSC (Bordeaux INP),
          spécialité Intelligence Artificielle, je conçois des agents
          intelligents basés sur des modèles de langage et leurs pipelines
          de traitement. Formé à concevoir des systèmes d'IA centrés sur
          l'humain, je garde aussi un pied dans la création audiovisuelle :
          courts métrages, montage vidéo et voyages.
        </p>

        <ul className="experience-list">
          <li>
            <span className="experience-date">MAI — JUIL. 2026</span>
            <div>
              <h3>Laboratoire de Cyberjustice — Montréal</h3>
              <p>
                Stagiaire recherche : conception et développement d'un agent
                IA de prise de décision, et étude des dynamiques de
                comportement au sein de systèmes multi-agents.
              </p>
            </div>
          </li>
          <li>
            <span className="experience-date">JUIL. — AOÛT 2025</span>
            <div>
              <h3>DB Alternative</h3>
              <p>
                Stagiaire : traitement de données géoréférencées d'obstacles
                aéronautiques (SIA), revue et analyse du code d'un site web.
              </p>
            </div>
          </li>
        </ul>

        <a
          href="/CV-Cyriac-Dupouey.pdf"
          download="CV-Cyriac-Dupouey.pdf"
          className="button-secondary"
        >
          <Download size={17} />
          Télécharger mon CV
          <ArrowUpRight size={17} />
        </a>
      </m.section>

      {/* FOOTER / CONTACT */}
      <footer
        id="contact"
        className="footer"
      >
        <span translate="no">
          CYRIAC<span className="orange-text">.</span>
        </span>

        <p>
          Ingénierie × IA × Création visuelle
        </p>

        <div className="contact-details">
  <a href="mailto:cyriacd35@gmail.com">
    <Mail size={18} />
    <span>cyriacd35@gmail.com</span>
  </a>

  <a href="tel:+33783939893">
    <Phone size={18} />
    <span>07 83 93 98 93</span>
  </a>

  <a href="https://github.com/Cyriacccc" target="_blank" rel="noopener noreferrer">
    <GithubIcon size={17} />
    <span>github.com/Cyriacccc</span>
  </a>

  <a href="https://www.linkedin.com/in/cyriac-dupouey-341751336/" target="_blank" rel="noopener noreferrer">
    <LinkedinIcon size={17} />
    <span>LinkedIn</span>
  </a>
</div>
        <small>
          © 2026 — <span translate="no">CYRIAC DUPOUEY</span>
        </small>
      </footer>
    </main>
  );
}

// Routes de l'application, partagées entre le navigateur (BrowserRouter)
// et le prérendu au build (StaticRouter, voir src/entry-server.jsx).
export function AppRoutes() {
  return (
    // LazyMotion + composants <m.*> : on n'embarque que les fonctions
    // d'animation utilisées (domAnimation) au lieu de tout framer-motion.
    // reducedMotion="user" : désactive les animations de transformation
    // pour les personnes ayant activé « réduire les animations » sur leur système.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>

        {/* Assistant IA, présent sur toutes les pages */}
        <PortfolioAssistant />
      </MotionConfig>
    </LazyMotion>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
