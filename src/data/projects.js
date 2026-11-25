/**
 * Contenu des pages projet (/projects/:slug), affiché par src/pages/ProjectPage.jsx.
 *
 * Ajouter un projet = ajouter un objet à ce fichier. Les sections facultatives
 * (demonstrations, results) sont simplement omises si elles n'existent pas ;
 * les numéros de section (01, 02…) sont calculés automatiquement.
 *
 * Titres : tableau de lignes ; une ligne { accent: "…" } est affichée en couleur.
 */
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  ChartColumn,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Gavel,
  Layers3,
  MessagesSquare,
  Play,
  Scale,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

const VIDEO_ASSISTANT_DEMO = "https://video-assistant-qtsm.onrender.com";
const VIDEO_ASSISTANT_GITHUB = "https://github.com/Cyriacccc/P2I.git";

const exploreAction = {
  label: "EXPLORE THE PROJECT",
  href: "#overview",
  variant: "primary",
  trailing: ArrowDown,
  trailingSize: 17,
};

export const projects = [
  /* ------------------------------------------------------------------ */
  {
    slug: "video-assistant",
    number: "001",
    navTitle: "VIDEO ASSISTANT",
    pageTitle: "Video Assistant — Cyriac Dupouey",
    description:
      "Video Assistant : outil Python de vision par ordinateur qui détecte les moments forts d'une vidéo et génère automatiquement un best-of.",

    hero: {
      status: "ENGINEERING PROJECT · 2026",
      eyebrow: "COMPUTER VISION / VIDEO AUTOMATION",
      title: ["VIDEO", { accent: "ASSISTANT." }],
      lead: "Turning long videos into meaningful moments.",
      intro:
        "A Python-based video analysis tool exploring how computer vision can help identify potentially interesting moments and automatically assemble a shorter video.",
      actions: [
        exploreAction,
        { label: "LIVE DEMO", href: VIDEO_ASSISTANT_DEMO, external: true, icon: Play, trailing: ArrowUpRight, trailingSize: 16 },
        { label: "SOURCE CODE", href: VIDEO_ASSISTANT_GITHUB, external: true, icon: ExternalLink, trailing: ArrowUpRight, trailingSize: 16 },
      ],
      index: ["AI × VIDEO PROCESSING", "01 — 04"],
    },

    overview: {
      label: "PROJECT OVERVIEW",
      small: "THE IDEA",
      title: ["LESS FOOTAGE.", { accent: "MORE MOMENTS." }],
      paragraphs: [
        "Reviewing long videos takes time. Video Assistant explores how computer vision can help identify potentially interesting moments automatically.",
        "The current approach compares consecutive frames, calculates a motion score and uses a statistical threshold to identify candidate sequences.",
        "The goal is to simplify the first stage of video selection while leaving the user in control of the final edit.",
      ],
      metrics: [
        { icon: Code2, label: "CORE LANGUAGE", value: "Python", text: "The foundation of the processing pipeline." },
        { icon: ScanEye, label: "MAIN APPROACH", value: "Computer vision", text: "Visual changes analysed across video frames." },
        { icon: Layers3, label: "EXPECTED OUTPUT", value: "Best Of", text: "A shorter selection of candidate sequences." },
      ],
      note: {
        icon: Sparkles,
        title: "Project objective",
        text: "Explore how video analysis can reduce the time spent reviewing raw footage before editing.",
      },
    },

    demonstrations: {
      label: "PROJECT IN ACTION",
      small: "WATCH THE PROCESS",
      title: ["FROM CODE", { accent: "TO APPLICATION." }],
      text: "Two perspectives on the same project: the technical pipeline behind the tool and the application designed to make it accessible.",
      items: [
        {
          id: "technical",
          number: "01",
          title: "Technical demonstration",
          subtitle: "INSIDE THE CODE",
          description:
            "Discover the Python pipeline, terminal output and video analysis process running in VS Code.",
          youtubeId: "hjRIYyV7yec",
          tag: "PYTHON / OPENCV",
        },
        {
          id: "application",
          number: "02",
          title: "Application demonstration",
          subtitle: "THE USER EXPERIENCE",
          description:
            "Explore the application interface and see how Video Assistant can be used to process videos.",
          youtubeId: "6OVDWAtihKY",
          tag: "APPLICATION / UI",
        },
      ],
    },

    workflow: {
      label: "HOW IT WORKS",
      small: "THE PIPELINE",
      title: ["FROM FRAMES", { accent: "TO HIGHLIGHTS." }],
      text: "Four stages turn raw footage into candidate sequences that can be reviewed and edited.",
      steps: [
        { icon: Video, title: "Video analysis", detail: "INPUT · VIDEO FRAMES", description: "The input video is read frame by frame to extract visual information and compare consecutive images." },
        { icon: ScanEye, title: "Motion detection", detail: "PROCESSING · MOTION SCORE", description: "Absolute frame differences are used to calculate a motion score and highlight periods of significant visual change." },
        { icon: Activity, title: "Highlight selection", detail: "ANALYSIS · THRESHOLD", description: "A statistical threshold identifies candidate segments that may contain interesting moments." },
        { icon: Layers3, title: "Best Of generation", detail: "OUTPUT · VIDEO SEQUENCES", description: "Selected segments are assembled into a shorter video for faster review and further editing." },
      ],
      note: {
        icon: Activity,
        title: "How motion is estimated",
        text: "The current prototype uses absolute differences between consecutive grayscale frames. The differences are aggregated into a motion score, which is compared against a threshold derived from the observed scores.",
      },
    },

    technologies: {
      label: "TECHNOLOGIES & TOOLS",
      small: "THE TOOLKIT",
      title: ["BUILT WITH", { accent: "PYTHON." }],
      text: "A lightweight stack combining computer vision, numerical processing, visualization and video editing.",
      items: [
        { name: "Python", category: "CORE LANGUAGE" },
        { name: "OpenCV", category: "COMPUTER VISION" },
        { name: "NumPy", category: "DATA PROCESSING" },
        { name: "Matplotlib", category: "VISUALIZATION" },
        { name: "MoviePy", category: "VIDEO EDITING" },
      ],
    },

    scope: {
      label: "DEVELOPMENT PERSPECTIVES",
      small: "NEXT CHALLENGES",
      title: ["DETECT.", { accent: "REFINE." }, "IMPROVE."],
      intro:
        "Motion is a useful starting point, but it does not necessarily mean that a moment is interesting. A camera movement, a sudden change of scene or an accidental movement can also produce a high score.",
      items: [
        { title: "Improve segment selection", text: "Refine thresholds and temporal rules to reduce fragmented or irrelevant sequences." },
        { title: "Combine multiple signals", text: "Explore how audio information and visual features could complement motion detection." },
        { title: "Evaluate the results", text: "Compare selected sequences with human judgments to assess their relevance and usefulness." },
      ],
    },

    cta: {
      small: "EXPLORE THE PROJECT",
      title: ["WANT TO SEE", { accent: "IT IN ACTION?" }],
      text: "Explore the application or dive into the source code to discover the implementation.",
      actions: [
        { label: "OPEN LIVE DEMO", href: VIDEO_ASSISTANT_DEMO, external: true, variant: "primary", trailing: ArrowUpRight, trailingSize: 17 },
        { label: "VIEW SOURCE CODE", href: VIDEO_ASSISTANT_GITHUB, external: true, icon: ExternalLink, trailing: ArrowUpRight, trailingSize: 16 },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "dispute-agent",
    number: "002",
    navTitle: "DISPUTE AGENT",
    pageTitle: "Dispute Agent — médiation de litiges par agents LLM — Cyriac Dupouey",
    description:
      "Dispute Agent : framework de simulation multi-agents développé au Laboratoire de Cyberjustice (Montréal) pour évaluer la médiation de litiges par des agents LLM.",

    hero: {
      status: "RESEARCH INTERNSHIP · 2026",
      eyebrow: "LLM AGENTS / MULTI-AGENT SIMULATION",
      title: ["DISPUTE", { accent: "AGENT." }],
      lead: "Simulating and evaluating AI mediation between LLM agents.",
      intro:
        "A multi-agent framework developed at the Cyberjustice Laboratory in Montréal: LLM-driven parties negotiate a dispute, optionally guided by an AI mediator, while every turn is recorded for reproducible evaluation.",
      actions: [exploreAction],
      index: ["LLM × ONLINE DISPUTE RESOLUTION", "01 — 05"],
    },

    overview: {
      label: "PROJECT OVERVIEW",
      small: "THE CONTEXT",
      title: ["CAN AN AI", { accent: "MEDIATE?" }],
      paragraphs: [
        "Online dispute resolution is a key lever for access to justice. Before an AI mediator can be trusted, its behaviour has to be measured across many realistic conflicts, which general social-interaction datasets such as Sotopia do not cover.",
        "Dispute Agent fills that gap: it generates diverse personas, places two of them in a dispute, optionally adds an LLM mediator, and records every turn into a structured, reproducible transcript.",
        "Dispute-specific variables are modelled explicitly: surface position versus underlying interest, asymmetric private information, BATNA, bottom line and Thomas-Kilmann conflict orientation.",
      ],
      metrics: [
        { icon: Users, label: "AGENTS", value: "Parties + mediator", text: "Two LLM disputants, optionally joined by an AI mediator." },
        { icon: Scale, label: "DOMAIN", value: "Dispute resolution", text: "Neighbour, consumer and workplace disputes, among other types." },
        { icon: Gavel, label: "EVALUATION", value: "LLM jury", text: "A three-model panel scores each transcript on six dimensions." },
      ],
      note: {
        icon: Sparkles,
        title: "My role",
        text: "Research intern in the laboratory team: design and development of an AI decision-making agent able to model behaviours in a given environment, and study of behavioural dynamics within multi-agent systems.",
      },
    },

    workflow: {
      label: "HOW IT WORKS",
      small: "THE PIPELINE",
      title: ["FROM PERSONAS", { accent: "TO VERDICTS." }],
      text: "Four stages turn configuration files into evaluated, reproducible negotiations.",
      steps: [
        { icon: Users, title: "Persona generation", detail: "INPUT · PERSONA AXES", description: "Seeded sampling over demographics, Big Five traits, conflict orientation and cultural dimensions; an LLM expands each profile into a biography." },
        { icon: FileText, title: "Dispute scenarios", detail: "CONTEXT · DISPUTE INSTANCES", description: "Curated disputes define each party's position, interests, private information, BATNA and bottom line." },
        { icon: MessagesSquare, title: "Arena negotiation", detail: "SIMULATION · ORCHESTRATOR", description: "A round-robin orchestrator runs stateless party and mediator agents, detects agreement and streams every turn." },
        { icon: Gavel, title: "Jury evaluation", detail: "OUTPUT · LLM JURY", description: "A cross-family panel of three LLM judges scores each transcript, analysed against matched control runs." },
      ],
      note: {
        icon: ShieldCheck,
        title: "Built for reproducibility",
        text: "Every model call goes through a single asynchronous client (Anthropic, OpenAI, OpenRouter or an offline mock). Seeds, configurations and prompts are snapshotted with each run, and model families are mixed across roles to limit self-preference bias.",
      },
    },

    results: {
      label: "PILOT RESULTS",
      small: "WHAT THE DATA SAYS",
      title: ["MEDIATION", { accent: "MAKES A DIFFERENCE." }],
      text: "Pilot run with low-cost models: 12 personas, 10 pairings, 3 dispute types × {control, facilitative, evaluative}, giving 90 transcripts scored by a three-judge jury.",
      figures: [
        { icon: ChartColumn, label: "QUALITY GAIN", value: "+0.70", text: "Facilitative mediation vs. control on a 1–5 scale (Cohen's d = 0.83, p = 0.0002)." },
        { icon: Sparkles, label: "BEST STYLE", value: "4.40 / 5", text: "Facilitative mediation, with a 97 % agreement rate, ahead of evaluative (4.16)." },
        { icon: ShieldCheck, label: "STYLE ADHERENCE", value: "0.78", text: "Accuracy of an independent classifier on the mediator's assigned style." },
      ],
      tables: [
        {
          caption: "Mediation effect — paired within persona pair × dispute (jury quality, 1–5)",
          columns: ["Comparison", "Pairs", "Δ quality [95 % CI]", "Cohen's d", "Wilcoxon p"],
          rows: [
            ["Facilitative vs. control", "30", "+0.70 [+0.41, +1.01]", "+0.83", "0.0002"],
            ["Evaluative vs. control", "30", "+0.46 [+0.18, +0.72]", "+0.60", "0.0005"],
            ["Any mediation vs. control", "30", "+0.58 [+0.32, +0.85]", "+0.77", "0.0003"],
          ],
        },
        {
          caption: "Results by dispute type",
          columns: ["Dispute type", "Jury quality", "Agreement rate"],
          rows: [
            ["Workplace", "4.47", "1.00"],
            ["Neighbour", "3.93", "0.97"],
            ["Consumer", "3.86", "0.63"],
          ],
        },
      ],
      note: {
        icon: Activity,
        title: "An honest limitation",
        text: "Disputants drift toward collaborative behaviour (conflict-orientation accuracy 0.51, chance 0.20): LLM parties under-enact adversarial modes, the documented “overly agreeable” bias of aligned models, and a concrete target for future work.",
      },
    },

    technologies: {
      label: "TECHNOLOGIES & TOOLS",
      small: "THE TOOLKIT",
      title: ["BUILT WITH", { accent: "PYTHON & LLMs." }],
      text: "An asynchronous Python stack to orchestrate agents, with Jinja2 prompt templates, Docker deployment, pytest tests and a React interface to follow simulations live.",
      items: [
        { name: "Python", category: "CORE LANGUAGE" },
        { name: "LLM APIs", category: "ANTHROPIC · OPENAI · OPENROUTER" },
        { name: "Pydantic v2", category: "DATA SCHEMAS" },
        { name: "FastAPI + SSE", category: "LIVE STREAMING API" },
        { name: "React + TS", category: "INTERFACE" },
      ],
    },

    scope: {
      label: "DEVELOPMENT PERSPECTIVES",
      small: "NEXT STEPS",
      title: ["SCALE.", { accent: "VALIDATE." }, "PUBLISH."],
      intro:
        "The pilot validates the methodology and its direction. The next stage turns it into paper-ready evidence.",
      items: [
        { title: "Frontier-model runs", text: "Re-run parties, mediator and judges with frontier models to obtain the final headline numbers." },
        { title: "Human-expert validation", text: "Annotate a subset with experts and report inter-rater reliability (Krippendorff's α, Gwet's AC2)." },
        { title: "Richer disputes", text: "Multi-issue disputes with Pareto and joint-utility metrics, and a larger, balanced persona pool." },
      ],
    },

    cta: {
      small: "INTERESTED?",
      title: ["WANT TO", { accent: "KNOW MORE?" }],
      text: "Dispute Agent is part of an ongoing research project at the Cyberjustice Laboratory. Feel free to contact me to discuss it.",
      actions: [
        { label: "CONTACT ME", href: "/#contact", variant: "primary", trailing: ArrowUpRight, trailingSize: 17 },
        { label: "DOWNLOAD MY CV", href: "/CV-Cyriac-Dupouey.pdf", download: "CV-Cyriac-Dupouey.pdf", icon: Download, trailing: ArrowUpRight, trailingSize: 16 },
      ],
    },
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
