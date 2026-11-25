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

export const SITE_URL = "https://cyriac-portfolio.vercel.app";

const VIDEO_ASSISTANT_DEMO = "https://video-assistant-qtsm.onrender.com";
const VIDEO_ASSISTANT_GITHUB = "https://github.com/Cyriacccc/P2I.git";

const exploreAction = {
  label: "DÉCOUVRIR LE PROJET",
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
      status: "PROJET D'INGÉNIERIE · 2026",
      eyebrow: "VISION PAR ORDINATEUR / AUTOMATISATION VIDÉO",
      title: ["VIDEO", { accent: "ASSISTANT." }],
      lead: "Transformer de longues vidéos en moments forts.",
      intro:
        "Un outil d'analyse vidéo en Python qui explore comment la vision par ordinateur peut repérer les moments potentiellement intéressants d'une vidéo et assembler automatiquement une version courte.",
      actions: [
        exploreAction,
        { label: "DÉMO EN LIGNE", href: VIDEO_ASSISTANT_DEMO, external: true, icon: Play, trailing: ArrowUpRight, trailingSize: 16 },
        { label: "CODE SOURCE", href: VIDEO_ASSISTANT_GITHUB, external: true, icon: ExternalLink, trailing: ArrowUpRight, trailingSize: 16 },
      ],
      index: ["IA × TRAITEMENT VIDÉO", "PROJET PERSONNEL"],
    },

    overview: {
      label: "PRÉSENTATION",
      small: "L'IDÉE",
      title: ["MOINS DE RUSHES.", { accent: "PLUS DE MOMENTS." }],
      paragraphs: [
        "Visionner de longues vidéos prend du temps. Video Assistant explore comment la vision par ordinateur peut repérer automatiquement les moments potentiellement intéressants.",
        "L'approche actuelle compare les images successives, calcule un score de mouvement et utilise un seuil statistique pour identifier les séquences candidates.",
        "L'objectif est de simplifier la première étape de sélection, tout en laissant l'utilisateur maître du montage final.",
      ],
      metrics: [
        { icon: Code2, label: "LANGAGE", value: "Python", text: "La base de toute la chaîne de traitement." },
        { icon: ScanEye, label: "APPROCHE", value: "Vision par ordinateur", text: "Les changements visuels sont analysés image par image." },
        { icon: Layers3, label: "RÉSULTAT", value: "Best-of", text: "Une sélection courte des séquences candidates." },
      ],
      note: {
        icon: Sparkles,
        title: "Objectif du projet",
        text: "Réduire le temps passé à visionner les rushes avant le montage grâce à l'analyse vidéo.",
      },
    },

    demonstrations: {
      label: "LE PROJET EN ACTION",
      small: "VOIR LE FONCTIONNEMENT",
      title: ["DU CODE", { accent: "À L'APPLICATION." }],
      text: "Deux points de vue sur le même projet : la chaîne de traitement technique et l'application qui la rend accessible.",
      items: [
        {
          id: "technical",
          number: "01",
          title: "Démonstration technique",
          subtitle: "DANS LE CODE",
          description:
            "Le pipeline Python, la sortie du terminal et l'analyse de la vidéo, exécutés dans VS Code.",
          youtubeId: "hjRIYyV7yec",
          tag: "PYTHON / OPENCV",
        },
        {
          id: "application",
          number: "02",
          title: "Démonstration de l'application",
          subtitle: "L'EXPÉRIENCE UTILISATEUR",
          description:
            "L'interface de l'application et la façon dont Video Assistant traite une vidéo.",
          youtubeId: "6OVDWAtihKY",
          tag: "APPLICATION / UI",
        },
      ],
    },

    workflow: {
      label: "FONCTIONNEMENT",
      small: "LA CHAÎNE DE TRAITEMENT",
      title: ["DES IMAGES", { accent: "AUX MOMENTS FORTS." }],
      text: "Quatre étapes transforment des rushes bruts en séquences candidates, prêtes à être revues et montées.",
      steps: [
        { icon: Video, title: "Analyse de la vidéo", detail: "ENTRÉE · IMAGES", description: "La vidéo est lue image par image pour extraire l'information visuelle et comparer les images successives." },
        { icon: ScanEye, title: "Détection du mouvement", detail: "TRAITEMENT · SCORE", description: "Les différences absolues entre images donnent un score de mouvement qui fait ressortir les changements visuels importants." },
        { icon: Activity, title: "Sélection des moments", detail: "ANALYSE · SEUIL", description: "Un seuil statistique identifie les segments susceptibles de contenir des moments intéressants." },
        { icon: Layers3, title: "Génération du best-of", detail: "SORTIE · SÉQUENCES", description: "Les segments retenus sont assemblés en une vidéo courte, plus rapide à revoir et à monter." },
      ],
      note: {
        icon: Activity,
        title: "Comment le mouvement est estimé",
        text: "Le prototype calcule les différences absolues entre images successives en niveaux de gris. Ces différences sont agrégées en un score de mouvement, comparé à un seuil déduit des scores observés.",
      },
    },

    technologies: {
      label: "TECHNOLOGIES & OUTILS",
      small: "LA BOÎTE À OUTILS",
      title: ["CONSTRUIT", { accent: "EN PYTHON." }],
      text: "Une stack légère qui combine vision par ordinateur, calcul numérique, visualisation et montage vidéo.",
      items: [
        { name: "Python", category: "LANGAGE" },
        { name: "OpenCV", category: "VISION PAR ORDINATEUR" },
        { name: "NumPy", category: "CALCUL NUMÉRIQUE" },
        { name: "Matplotlib", category: "VISUALISATION" },
        { name: "MoviePy", category: "MONTAGE VIDÉO" },
      ],
    },

    scope: {
      label: "PERSPECTIVES",
      small: "PROCHAINS DÉFIS",
      title: ["DÉTECTER.", { accent: "AFFINER." }, "AMÉLIORER."],
      intro:
        "Le mouvement est un bon point de départ, mais il ne signifie pas toujours qu'un moment est intéressant : un mouvement de caméra, un changement de scène brusque ou un geste accidentel peuvent aussi produire un score élevé.",
      items: [
        { title: "Améliorer la sélection", text: "Affiner les seuils et les règles temporelles pour limiter les séquences fragmentées ou hors sujet." },
        { title: "Combiner plusieurs signaux", text: "Compléter la détection du mouvement par l'audio et d'autres caractéristiques visuelles." },
        { title: "Évaluer les résultats", text: "Comparer les séquences retenues avec des jugements humains pour mesurer leur pertinence." },
      ],
    },

    cta: {
      small: "DÉCOUVRIR LE PROJET",
      title: ["ENVIE DE LE VOIR", { accent: "EN ACTION ?" }],
      text: "Testez l'application ou plongez dans le code source. Hébergée gratuitement sur Render, l'application peut mettre environ une minute à démarrer.",
      actions: [
        { label: "OUVRIR LA DÉMO", href: VIDEO_ASSISTANT_DEMO, external: true, variant: "primary", trailing: ArrowUpRight, trailingSize: 17 },
        { label: "VOIR LE CODE SOURCE", href: VIDEO_ASSISTANT_GITHUB, external: true, icon: ExternalLink, trailing: ArrowUpRight, trailingSize: 16 },
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
      status: "STAGE DE RECHERCHE · 2026",
      eyebrow: "AGENTS LLM / SIMULATION MULTI-AGENTS",
      title: ["DISPUTE", { accent: "AGENT." }],
      lead: "Simuler et évaluer la médiation par IA entre agents LLM.",
      intro:
        "Un framework multi-agents développé au Laboratoire de Cyberjustice de Montréal : des agents LLM négocient un litige, avec ou sans médiateur IA, et chaque tour de parole est enregistré pour une évaluation reproductible.",
      actions: [exploreAction],
      index: ["LLM × RÉSOLUTION DE LITIGES", "LABORATOIRE DE CYBERJUSTICE"],
    },

    overview: {
      label: "PRÉSENTATION",
      small: "LE CONTEXTE",
      title: ["UNE IA PEUT-ELLE", { accent: "MÉDIER ?" }],
      paragraphs: [
        "La résolution de litiges en ligne est un levier important d'accès à la justice. Avant de faire confiance à un médiateur IA, il faut mesurer son comportement sur de nombreux conflits réalistes, ce que les jeux de données d'interaction sociale généralistes comme Sotopia ne couvrent pas.",
        "Dispute Agent comble ce manque : il génère des personas variés, en place deux dans un litige, ajoute si besoin un médiateur LLM, et enregistre chaque tour dans une transcription structurée et reproductible.",
        "Les variables propres aux litiges sont modélisées explicitement : position affichée et intérêts réels, informations privées asymétriques, BATNA, seuil de rupture et orientation face au conflit (Thomas-Kilmann).",
      ],
      metrics: [
        { icon: Users, label: "AGENTS", value: "Parties + médiateur", text: "Deux agents LLM en conflit, rejoints si besoin par un médiateur IA." },
        { icon: Scale, label: "DOMAINE", value: "Résolution de litiges", text: "Litiges de voisinage, de consommation, au travail, entre autres." },
        { icon: Gavel, label: "ÉVALUATION", value: "Jury de LLM", text: "Un panel de trois modèles note chaque transcription sur six critères." },
      ],
      note: {
        icon: Sparkles,
        title: "Mon rôle",
        text: "Stagiaire de recherche dans l'équipe du laboratoire : conception et développement d'un agent IA de prise de décision capable de modéliser des comportements dans un environnement donné, et étude des dynamiques de comportement au sein de systèmes multi-agents.",
      },
    },

    workflow: {
      label: "FONCTIONNEMENT",
      small: "LA CHAÎNE DE TRAITEMENT",
      title: ["DES PERSONAS", { accent: "AU VERDICT." }],
      text: "Quatre étapes transforment des fichiers de configuration en négociations évaluées et reproductibles.",
      steps: [
        { icon: Users, title: "Génération des personas", detail: "ENTRÉE · AXES DE PERSONAS", description: "Tirage reproductible sur la démographie, les traits Big Five, l'orientation face au conflit et la culture ; un LLM développe chaque profil en biographie." },
        { icon: FileText, title: "Scénarios de litige", detail: "CONTEXTE · LITIGES", description: "Des litiges construits à la main définissent pour chaque partie sa position, ses intérêts, ses informations privées, sa BATNA et son seuil de rupture." },
        { icon: MessagesSquare, title: "Négociation dans l'arène", detail: "SIMULATION · ORCHESTRATEUR", description: "Un orchestrateur à tour de rôle fait dialoguer les agents parties et médiateur, détecte les accords et diffuse chaque tour en direct." },
        { icon: Gavel, title: "Évaluation par le jury", detail: "SORTIE · JURY DE LLM", description: "Un panel de trois juges LLM de familles différentes note chaque transcription, comparée à des négociations témoins appariées." },
      ],
      note: {
        icon: ShieldCheck,
        title: "Pensé pour la reproductibilité",
        text: "Chaque appel de modèle passe par un client asynchrone unique (Anthropic, OpenAI, OpenRouter ou un modèle factice hors ligne). Graines aléatoires, configurations et prompts sont enregistrés avec chaque exécution, et les familles de modèles varient selon les rôles pour limiter les biais d'auto-préférence.",
      },
    },

    results: {
      label: "RÉSULTATS PILOTES",
      small: "CE QUE DISENT LES DONNÉES",
      title: ["LA MÉDIATION", { accent: "FAIT LA DIFFÉRENCE." }],
      text: "Expérience pilote avec des modèles peu coûteux : 12 personas, 10 paires, 3 types de litiges × {témoin, facilitatif, évaluatif}, soit 90 transcriptions notées par un jury de trois juges.",
      figures: [
        { icon: ChartColumn, label: "GAIN DE QUALITÉ", value: "+0,70", text: "Médiation facilitative contre témoin, sur une échelle de 1 à 5 (d de Cohen = 0,83 ; p = 0,0002)." },
        { icon: Sparkles, label: "MEILLEUR STYLE", value: "4,40 / 5", text: "Médiation facilitative, avec 97 % d'accords, devant l'évaluative (4,16)." },
        { icon: ShieldCheck, label: "RESPECT DU STYLE", value: "0,78", text: "Précision d'un classifieur indépendant sur le style assigné au médiateur." },
      ],
      tables: [
        {
          caption: "Effet de la médiation — comparaison appariée par paire de personas × litige (qualité jugée, 1 à 5)",
          columns: ["Comparaison", "Paires", "Δ qualité [IC 95 %]", "d de Cohen", "p (Wilcoxon)"],
          rows: [
            ["Facilitative vs témoin", "30", "+0,70 [+0,41 ; +1,01]", "+0,83", "0,0002"],
            ["Évaluative vs témoin", "30", "+0,46 [+0,18 ; +0,72]", "+0,60", "0,0005"],
            ["Toute médiation vs témoin", "30", "+0,58 [+0,32 ; +0,85]", "+0,77", "0,0003"],
          ],
        },
        {
          caption: "Résultats par type de litige",
          columns: ["Type de litige", "Qualité jugée", "Taux d'accord"],
          rows: [
            ["Travail", "4,47", "1,00"],
            ["Voisinage", "3,93", "0,97"],
            ["Consommation", "3,86", "0,63"],
          ],
        },
      ],
      note: {
        icon: Activity,
        title: "Une limite assumée",
        text: "Les agents parties dérivent vers un comportement coopératif (précision de l'orientation face au conflit : 0,51, contre 0,20 au hasard) : ils jouent mal les rôles conflictuels, un biais « trop conciliant » connu des modèles alignés, et une piste concrète pour la suite.",
      },
    },

    technologies: {
      label: "TECHNOLOGIES & OUTILS",
      small: "LA BOÎTE À OUTILS",
      title: ["CONSTRUIT EN", { accent: "PYTHON & LLM." }],
      text: "Une stack Python asynchrone pour orchestrer les agents, avec des prompts Jinja2, un déploiement Docker, des tests pytest et une interface React pour suivre les simulations en direct.",
      items: [
        { name: "Python", category: "LANGAGE" },
        { name: "API LLM", category: "ANTHROPIC · OPENAI · OPENROUTER" },
        { name: "Pydantic v2", category: "SCHÉMAS DE DONNÉES" },
        { name: "FastAPI + SSE", category: "API EN DIRECT" },
        { name: "React + TS", category: "INTERFACE" },
      ],
    },

    scope: {
      label: "PERSPECTIVES",
      small: "PROCHAINES ÉTAPES",
      title: ["PASSER À L'ÉCHELLE.", { accent: "VALIDER." }, "PUBLIER."],
      intro:
        "Le pilote valide la méthode et la direction des résultats. L'étape suivante consiste à en faire des résultats publiables.",
      items: [
        { title: "Modèles de pointe", text: "Relancer parties, médiateur et juges avec des modèles de pointe pour obtenir les chiffres définitifs." },
        { title: "Validation par des experts", text: "Faire annoter un sous-ensemble par des experts et mesurer l'accord inter-annotateurs (α de Krippendorff, AC2 de Gwet)." },
        { title: "Des litiges plus riches", text: "Des litiges à plusieurs enjeux avec des métriques d'utilité conjointe et de Pareto, et un panel de personas plus large et équilibré." },
      ],
    },

    cta: {
      small: "INTÉRESSÉ ?",
      title: ["ENVIE D'EN", { accent: "SAVOIR PLUS ?" }],
      text: "Dispute Agent fait partie d'un projet de recherche en cours au Laboratoire de Cyberjustice. N'hésitez pas à me contacter pour en discuter.",
      actions: [
        { label: "ME CONTACTER", href: "/#contact", variant: "primary", trailing: ArrowUpRight, trailingSize: 17 },
        { label: "TÉLÉCHARGER MON CV", href: "/CV-Cyriac-Dupouey.pdf", download: "CV-Cyriac-Dupouey.pdf", icon: Download, trailing: ArrowUpRight, trailingSize: 16 },
      ],
    },
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
