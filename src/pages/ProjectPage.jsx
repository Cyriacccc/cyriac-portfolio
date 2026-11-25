import { Fragment, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowDown, ArrowUpRight, Play, X, Maximize2, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { getProject } from "../data/projects";
import usePageMeta from "../hooks/usePageMeta";
import "../styles/global.css";

/*
 * Page de détail d'un projet, entièrement pilotée par src/data/projects.js.
 * Sections dans l'ordre : présentation, démonstrations (facultatif), pipeline,
 * résultats (facultatif), technologies, perspectives, appel à l'action.
 */

const pad = (n) => String(n).padStart(2, "0");

// Titre sur plusieurs lignes : ["LIGNE", { accent: "LIGNE EN COULEUR" }]
function Title({ lines }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {typeof line === "string" ? line : <span>{line.accent}</span>}
    </Fragment>
  ));
}

function SectionLabel({ number, children }) {
  return (
    <div className="va-section-label">
      <span>{number}</span>
      <span className="va-label-line" />
      {children}
    </div>
  );
}

function SectionHeading({ className, small, title, text }) {
  return (
    <div className={className}>
      <div>
        <span className="va-small-label">{small}</span>
        <h2>
          <Title lines={title} />
        </h2>
      </div>
      <p>{text}</p>
    </div>
  );
}

function Action({ action }) {
  const { label, href, variant, icon: Icon, trailing: Trailing, trailingSize, external, download } = action;
  return (
    <a
      href={href}
      className={variant === "primary" ? "va-primary-button" : "va-secondary-button"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download } : {})}
    >
      {Icon && <Icon size={17} />}
      {label}
      {Trailing && <Trailing size={trailingSize} />}
    </a>
  );
}

function Note({ className, iconWrapper, note }) {
  const Icon = note.icon;
  if (iconWrapper) {
    // Variante « encadré pipeline » : icône dans une pastille + texte
    return (
      <div className={className}>
        <div className={iconWrapper}>
          <Icon size={20} />
        </div>
        <div>
          <strong>{note.title}</strong>
          <p>{note.text}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <Icon size={19} />
      <p>
        <strong>{note.title}</strong>
        <span>{note.text}</span>
      </p>
    </div>
  );
}

function MetricCards({ items }) {
  return (
    <div className="va-metrics-grid">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article className="va-metric-card" key={item.label}>
            <span className="va-metric-icon">
              <Icon size={20} />
            </span>
            <span className="va-metric-label">{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [activeDemo, setActiveDemo] = useState(null);
  usePageMeta(project?.pageTitle, project?.description);

  if (!project) return <Navigate to="/" replace />;

  const { hero, overview, demonstrations, workflow, results, technologies, scope, cta } = project;

  // Numérotation automatique des sections présentes
  let sectionCount = 0;
  const next = () => pad(++sectionCount);

  return (
    <main className="va-page">
      {/* NAVIGATION */}
      <nav className="va-nav">
        <Link to="/" className="va-back">
          <ArrowLeft size={17} />
          <span>RETOUR AU PORTFOLIO</span>
        </Link>

        <span className="va-nav-label">
          PROJET {project.number} <span>/</span> {project.navTitle}
        </span>

        <div className="va-nav-links">
          <a href="/#projects">PROJETS</a>
          <a href="/#contact">CONTACT</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="va-hero">
        <div className="va-hero-glow" />

        <m.div
          className="va-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="va-status">
            <span className="va-status-dot" />
            {hero.status}
          </div>

          <span className="va-eyebrow">{hero.eyebrow}</span>

          <h1>
            <Title lines={hero.title} />
          </h1>

          <p className="va-lead">{hero.lead}</p>

          <p className="va-intro">{hero.intro}</p>

          <div className="va-hero-actions">
            {hero.actions.map((action) => (
              <Action key={action.label} action={action} />
            ))}
          </div>
        </m.div>

        <m.div
          className="va-hero-index"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span>{hero.index[0]}</span>
          <span>{hero.index[1]}</span>
        </m.div>

        <a href="#overview" className="va-scroll-indicator">
          <span>DÉFILER POUR EXPLORER</span>
          <ArrowDown size={15} />
        </a>
      </section>

      {/* PRÉSENTATION */}
      <section className="va-section" id="overview">
        <SectionLabel number={next()}>{overview.label}</SectionLabel>

        <div className="va-overview-grid">
          <div>
            <span className="va-small-label">{overview.small}</span>
            <h2>
              <Title lines={overview.title} />
            </h2>
          </div>

          <div className="va-overview-copy">
            {overview.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>

        <MetricCards items={overview.metrics} />

        <Note className="va-project-note" note={overview.note} />
      </section>

      {/* DÉMONSTRATIONS (facultatif) */}
      {demonstrations && (
        <section className="va-demo-section" id="demonstrations">
          <SectionLabel number={next()}>{demonstrations.label}</SectionLabel>

          <SectionHeading className="va-demo-heading" {...demonstrations} />

          <div className="va-demo-grid">
            {demonstrations.items.map((demo, index) => (
              <m.article
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
                  aria-label={`Regarder : ${demo.title}`}
                >
                  <img
                    className="va-demo-thumbnail-video"
                    src={`https://img.youtube.com/vi/${demo.youtubeId}/hqdefault.jpg`}
                    alt={`Miniature : ${demo.title}`}
                    loading="lazy"
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
                    VOIR LA DÉMONSTRATION
                    <ArrowUpRight size={15} />
                  </span>
                </button>

                <div className="va-demo-card-info">
                  <span className="va-demo-card-subtitle">{demo.subtitle}</span>

                  <h3>{demo.title}</h3>

                  <p>{demo.description}</p>

                  <span className="va-demo-tag">{demo.tag}</span>
                </div>
              </m.article>
            ))}
          </div>

          <p className="va-caption">
            <Maximize2 size={14} />
            Sélectionnez une vidéo pour ouvrir le lecteur.
          </p>
        </section>
      )}

      {/* LECTEUR VIDÉO */}
      <AnimatePresence>
        {activeDemo && (
          <Modal
            className="va-video-modal"
            label={activeDemo.title}
            onClose={() => setActiveDemo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <m.div
              className="va-video-modal-content"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
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
                  aria-label="Fermer la vidéo"
                >
                  <X size={23} />
                </button>
              </div>

              <iframe
                key={activeDemo.id}
                className="va-video-player"
                src={`https://www.youtube.com/embed/${activeDemo.youtubeId}?autoplay=1&rel=0`}
                title={activeDemo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }}
              />

              <div className="va-video-modal-footer">
                <span>{activeDemo.tag}</span>
                <span>{project.navTitle} · 2026</span>
              </div>
            </m.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* PIPELINE */}
      <section className="va-section va-workflow-section" id="workflow">
        <SectionLabel number={next()}>{workflow.label}</SectionLabel>

        <SectionHeading className="va-workflow-heading" {...workflow} />

        <div className="va-steps">
          {workflow.steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <m.article
                className="va-step"
                key={step.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="va-step-top">
                  <span>{pad(index + 1)}</span>
                  <Icon size={23} />
                </div>

                <span className="va-step-detail">{step.detail}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index < workflow.steps.length - 1 && (
                  <ChevronRight className="va-step-chevron" size={19} />
                )}
              </m.article>
            );
          })}
        </div>

        <Note className="va-pipeline-note" iconWrapper="va-pipeline-note-icon" note={workflow.note} />
      </section>

      {/* RÉSULTATS (facultatif) */}
      {results && (
        <section className="va-section va-results-section" id="results">
          <SectionLabel number={next()}>{results.label}</SectionLabel>

          <SectionHeading className="va-workflow-heading" {...results} />

          <MetricCards items={results.figures} />

          {results.tables.map((table) => (
            <div className="va-results-table-wrap" key={table.caption}>
              <table className="va-results-table">
                <caption>{table.caption}</caption>
                <thead>
                  <tr>
                    {table.columns.map((column) => (
                      <th scope="col" key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) =>
                        i === 0 ? (
                          <th scope="row" key={i}>
                            {cell}
                          </th>
                        ) : (
                          <td key={i}>{cell}</td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <Note className="va-pipeline-note" iconWrapper="va-pipeline-note-icon" note={results.note} />
        </section>
      )}

      {/* TECHNOLOGIES */}
      <section className="va-tech-section" id="technologies">
        <SectionLabel number={next()}>{technologies.label}</SectionLabel>

        <SectionHeading className="va-tech-heading" {...technologies} />

        <div className="va-tech-list">
          {technologies.items.map((technology, index) => (
            <m.div
              className="va-tech-item"
              key={technology.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="va-tech-item-top">
                <span>{pad(index + 1)}</span>
                <CheckCircle2 size={17} />
              </div>

              <h3>{technology.name}</h3>

              <span className="va-tech-category">{technology.category}</span>
            </m.div>
          ))}
        </div>
      </section>

      {/* PERSPECTIVES */}
      <section className="va-section va-scope-section">
        <SectionLabel number={next()}>{scope.label}</SectionLabel>

        <div className="va-scope-grid">
          <div>
            <span className="va-small-label">{scope.small}</span>
            <h2>
              <Title lines={scope.title} />
            </h2>
          </div>

          <div className="va-scope-copy">
            <p>{scope.intro}</p>

            {scope.items.map((item, index) => (
              <div className="va-scope-item" key={item.title}>
                <span>{pad(index + 1)}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPEL À L'ACTION */}
      <section className="va-cta-section">
        <span className="va-small-label">{cta.small}</span>

        <h2>
          <Title lines={cta.title} />
        </h2>

        <p>{cta.text}</p>

        <div className="va-hero-actions">
          {cta.actions.map((action) => (
            <Action key={action.label} action={action} />
          ))}
        </div>
      </section>

      {/* PIED DE PAGE */}
      <footer className="va-footer">
        <Link to="/" className="va-back">
          <ArrowLeft size={17} />
          RETOUR AU PORTFOLIO
        </Link>

        <span><span translate="no">CYRIAC DUPOUEY</span> · 2026</span>
      </footer>
    </main>
  );
}
