import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Play,
  ScanEye,
  Video,
  Layers3,
  X,
  Maximize2,
  Activity,
  Code2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const technologies = [
  { name: "Python", category: "CORE LANGUAGE" },
  { name: "OpenCV", category: "COMPUTER VISION" },
  { name: "NumPy", category: "DATA PROCESSING" },
  { name: "Matplotlib", category: "VISUALIZATION" },
  { name: "MoviePy", category: "VIDEO EDITING" },
];

const steps = [
  {
    number: "01",
    icon: Video,
    title: "Video analysis",
    description:
      "The input video is read frame by frame to extract visual information and compare consecutive images.",
    detail: "INPUT · VIDEO FRAMES",
  },
  {
    number: "02",
    icon: ScanEye,
    title: "Motion detection",
    description:
      "Absolute frame differences are used to calculate a motion score and highlight periods of significant visual change.",
    detail: "PROCESSING · MOTION SCORE",
  },
  {
    number: "03",
    icon: Activity,
    title: "Highlight selection",
    description:
      "A statistical threshold identifies candidate segments that may contain interesting moments.",
    detail: "ANALYSIS · THRESHOLD",
  },
  {
    number: "04",
    icon: Layers3,
    title: "Best Of generation",
    description:
      "Selected segments are assembled into a shorter video for faster review and further editing.",
    detail: "OUTPUT · VIDEO SEQUENCES",
  },
];

const demonstrations = [
  {
    id: "technical",
    number: "01",
    title: "Technical demonstration",
    subtitle: "INSIDE THE CODE",
    description:
      "Discover the Python pipeline, terminal output and video analysis process running in VS Code.",
    video: "/videos/video-assistant-technique.mp4",
    tag: "PYTHON / OPENCV",
  },
  {
    id: "application",
    number: "02",
    title: "Application demonstration",
    subtitle: "THE USER EXPERIENCE",
    description:
      "Explore the application interface and see how Video Assistant can be used to process videos.",
    video: "/videos/video-assistant-app.mp4",
    tag: "APPLICATION / UI",
  },
];

const projectLinks = {
  demo: "https://video-assistant-qtsm.onrender.com",
  github: "https://github.com/Cyriacccc/P2I.git",
};

export default function VideoAssistant() {
  const [activeDemo, setActiveDemo] = useState(null);

  // Fermeture de la fenêtre avec Échap et blocage du défilement en arrière-plan.
  useEffect(() => {
    if (!activeDemo) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveDemo(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeDemo]);

  return (
    <main className="va-page">
      {/* NAVIGATION */}
      <nav className="va-nav">
        <Link to="/" className="va-back">
          <ArrowLeft size={17} />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <span className="va-nav-label">
          PROJECT 001 <span>/</span> VIDEO ASSISTANT
        </span>
      </nav>

      {/* HERO */}
      <section className="va-hero">
        <div className="va-hero-glow" />

        <motion.div
          className="va-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="va-status">
            <span className="va-status-dot" />
            ENGINEERING PROJECT · 2026
          </div>

          <span className="va-eyebrow">
            COMPUTER VISION / VIDEO AUTOMATION
          </span>

          <h1>
            VIDEO
            <br />
            <span>ASSISTANT.</span>
          </h1>

          <p className="va-lead">
            Turning long videos into meaningful moments.
          </p>

          <p className="va-intro">
            A Python-based video analysis tool exploring how computer
            vision can help identify potentially interesting moments
            and automatically assemble a shorter video.
          </p>

          <div className="va-hero-actions">
            <a href="#overview" className="va-primary-button">
              EXPLORE THE PROJECT
              <ArrowDown size={17} />
            </a>

            <a
              href={projectLinks.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="va-secondary-button"
            >
              <Play size={17} />
              LIVE DEMO
              <ArrowUpRight size={16} />
            </a>

            <a
              href={projectLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="va-secondary-button"
            >
              <ExternalLink size={17} />
              SOURCE CODE
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="va-hero-index"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span>AI × VIDEO PROCESSING</span>
          <span>01 — 04</span>
        </motion.div>

        <a href="#overview" className="va-scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={15} />
        </a>
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="va-section" id="overview">
        <div className="va-section-label">
          <span>01</span>
          <span className="va-label-line" />
          PROJECT OVERVIEW
        </div>

        <div className="va-overview-grid">
          <div>
            <span className="va-small-label">THE IDEA</span>

            <h2>
              LESS FOOTAGE.
              <br />
              <span>MORE MOMENTS.</span>
            </h2>
          </div>

          <div className="va-overview-copy">
            <p>
              Reviewing long videos takes time. Video Assistant
              explores how computer vision can help identify
              potentially interesting moments automatically.
            </p>

            <p>
              The current approach compares consecutive frames,
              calculates a motion score and uses a statistical
              threshold to identify candidate sequences.
            </p>

            <p>
              The goal is to simplify the first stage of video
              selection while leaving the user in control of the
              final edit.
            </p>
          </div>
        </div>

        <div className="va-metrics-grid">
          <article className="va-metric-card">
            <span className="va-metric-icon">
              <Code2 size={20} />
            </span>
            <span className="va-metric-label">CORE LANGUAGE</span>
            <strong>Python</strong>
            <p>The foundation of the processing pipeline.</p>
          </article>

          <article className="va-metric-card">
            <span className="va-metric-icon">
              <ScanEye size={20} />
            </span>
            <span className="va-metric-label">MAIN APPROACH</span>
            <strong>Computer vision</strong>
            <p>Visual changes analysed across video frames.</p>
          </article>

          <article className="va-metric-card">
            <span className="va-metric-icon">
              <Layers3 size={20} />
            </span>
            <span className="va-metric-label">EXPECTED OUTPUT</span>
            <strong>Best Of</strong>
            <p>A shorter selection of candidate sequences.</p>
          </article>
        </div>

        <div className="va-project-note">
          <Sparkles size={19} />
          <p>
            <strong>Project objective</strong>
            <span>
              Explore how video analysis can reduce the time spent
              reviewing raw footage before editing.
            </span>
          </p>
        </div>
      </section>

      {/* DEMONSTRATIONS */}
      <section className="va-demo-section" id="demonstrations">
        <div className="va-section-label">
          <span>02</span>
          <span className="va-label-line" />
          PROJECT IN ACTION
        </div>

        <div className="va-demo-heading">
          <div>
            <span className="va-small-label">WATCH THE PROCESS</span>

            <h2>
              FROM CODE
              <br />
              <span>TO APPLICATION.</span>
            </h2>
          </div>

          <p>
            Two perspectives on the same project: the technical
            pipeline behind the tool and the application designed
            to make it accessible.
          </p>
        </div>

        <div className="va-demo-grid">
          {demonstrations.map((demo, index) => (
            <motion.article
              className="va-demo-card"
              key={demo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <button
                type="button"
                className="va-demo-thumbnail"
                onClick={() => setActiveDemo(demo)}
                aria-label={`Watch ${demo.title}`}
              >
                <video
                  className="va-demo-thumbnail-video"
                  src={demo.video}
                  muted
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                <span className="va-demo-thumbnail-overlay" />

                <span className="va-demo-number">{demo.number}</span>

                <span className="va-demo-play">
                  <Play size={25} fill="currentColor" />
                </span>

                <span className="va-demo-open">
                  <Maximize2 size={17} />
                </span>

                <span className="va-demo-watch">
                  WATCH DEMONSTRATION
                  <ArrowUpRight size={15} />
                </span>
              </button>

              <div className="va-demo-card-info">
                <span className="va-demo-card-subtitle">
                  {demo.subtitle}
                </span>

                <h3>{demo.title}</h3>

                <p>{demo.description}</p>

                <span className="va-demo-tag">{demo.tag}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="va-caption">
          <Maximize2 size={14} />
          Select a video to open the full player.
        </p>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            className="va-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setActiveDemo(null);
              }
            }}
          >
            <motion.div
              className="va-video-modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label={activeDemo.title}
            >
              <div className="va-video-modal-header">
                <div>
                  <span>{activeDemo.subtitle}</span>
                  <h3>{activeDemo.title}</h3>
                </div>

                <button
                  type="button"
                  className="va-video-modal-close"
                  onClick={() => setActiveDemo(null)}
                  aria-label="Close video"
                >
                  <X size={23} />
                </button>
              </div>

              <video
                key={activeDemo.id}
                className="va-video-player"
                src={activeDemo.video}
                controls
                autoPlay
                playsInline
                preload="metadata"
              >
                Your browser does not support HTML video.
              </video>

              <div className="va-video-modal-footer">
                <span>{activeDemo.tag}</span>
                <span>VIDEO ASSISTANT · 2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WORKFLOW */}
      <section className="va-section va-workflow-section" id="workflow">
        <div className="va-section-label">
          <span>03</span>
          <span className="va-label-line" />
          HOW IT WORKS
        </div>

        <div className="va-workflow-heading">
          <div>
            <span className="va-small-label">THE PIPELINE</span>

            <h2>
              FROM FRAMES
              <br />
              <span>TO HIGHLIGHTS.</span>
            </h2>
          </div>

          <p>
            Four stages turn raw footage into candidate sequences
            that can be reviewed and edited.
          </p>
        </div>

        <div className="va-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                className="va-step"
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="va-step-top">
                  <span>{step.number}</span>
                  <Icon size={23} />
                </div>

                <span className="va-step-detail">{step.detail}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index < steps.length - 1 && (
                  <ChevronRight className="va-step-chevron" size={19} />
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="va-pipeline-note">
          <div className="va-pipeline-note-icon">
            <Activity size={20} />
          </div>

          <div>
            <strong>How motion is estimated</strong>
            <p>
              The current prototype uses absolute differences between
              consecutive grayscale frames. The differences are
              aggregated into a motion score, which is compared
              against a threshold derived from the observed scores.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="va-tech-section" id="technologies">
        <div className="va-section-label">
          <span>04</span>
          <span className="va-label-line" />
          TECHNOLOGIES & TOOLS
        </div>

        <div className="va-tech-heading">
          <div>
            <span className="va-small-label">THE TOOLKIT</span>

            <h2>
              BUILT WITH
              <br />
              <span>PYTHON.</span>
            </h2>
          </div>

          <p>
            A lightweight stack combining computer vision,
            numerical processing, visualization and video editing.
          </p>
        </div>

        <div className="va-tech-list">
          {technologies.map((technology, index) => (
            <motion.div
              className="va-tech-item"
              key={technology.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="va-tech-item-top">
                <span>0{index + 1}</span>
                <CheckCircle2 size={17} />
              </div>

              <h3>{technology.name}</h3>

              <span className="va-tech-category">
                {technology.category}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEVELOPMENT PERSPECTIVES */}
      <section className="va-section va-scope-section">
        <div className="va-section-label">
          <span>05</span>
          <span className="va-label-line" />
          DEVELOPMENT PERSPECTIVES
        </div>

        <div className="va-scope-grid">
          <div>
            <span className="va-small-label">NEXT CHALLENGES</span>

            <h2>
              DETECT.
              <br />
              <span>REFINE.</span>
              <br />
              IMPROVE.
            </h2>
          </div>

          <div className="va-scope-copy">
            <p>
              Motion is a useful starting point, but it does not
              necessarily mean that a moment is interesting. A camera
              movement, a sudden change of scene or an accidental
              movement can also produce a high score.
            </p>

            <div className="va-scope-item">
              <span>01</span>
              <div>
                <h3>Improve segment selection</h3>
                <p>
                  Refine thresholds and temporal rules to reduce
                  fragmented or irrelevant sequences.
                </p>
              </div>
            </div>

            <div className="va-scope-item">
              <span>02</span>
              <div>
                <h3>Combine multiple signals</h3>
                <p>
                  Explore how audio information and visual features
                  could complement motion detection.
                </p>
              </div>
            </div>

            <div className="va-scope-item">
              <span>03</span>
              <div>
                <h3>Evaluate the results</h3>
                <p>
                  Compare selected sequences with human judgments
                  to assess their relevance and usefulness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="va-cta-section">
        <span className="va-small-label">EXPLORE THE PROJECT</span>

        <h2>
          WANT TO SEE
          <br />
          <span>IT IN ACTION?</span>
        </h2>

        <p>
          Explore the application or dive into the source code
          to discover the implementation.
        </p>

        <div className="va-hero-actions">
          <a
            href={projectLinks.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="va-primary-button"
          >
            OPEN LIVE DEMO
            <ArrowUpRight size={17} />
          </a>

          <a
            href={projectLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="va-secondary-button"
          >
            <ExternalLink size={17} />
            VIEW SOURCE CODE
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="va-footer">
        <Link to="/" className="va-back">
          <ArrowLeft size={17} />
          BACK TO PORTFOLIO
        </Link>

        <span>CYRIAC DUPOUEY · 2026</span>
      </footer>
    </main>
  );
}