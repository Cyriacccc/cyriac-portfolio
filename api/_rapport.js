// Le rapport réservé à Cyriac, affiché quand il tape son code secret dans l'assistant.
import { lireSupabase } from "./_outils.js";

const JOUR = 24 * 60 * 60 * 1000;

const PAYS = { FR: "France", BE: "Belgique", CH: "Suisse", CA: "Canada", US: "États-Unis", GB: "Royaume-Uni",
  DE: "Allemagne", ES: "Espagne", IT: "Italie", LU: "Luxembourg", NL: "Pays-Bas", MA: "Maroc", "?": "inconnu" };

const nomPays = (code) => PAYS[code] || code;

function heure(date) {
  return new Date(date).toLocaleString("fr-FR", { timeZone: "Europe/Paris", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

// Les éléments les plus fréquents, avec leur part en % : "linkedin.com 45 % · direct 30 % ..."
function top(valeurs, nombre = 5, nommer = (v) => v) {
  const comptes = {};
  for (const v of valeurs) comptes[v] = (comptes[v] || 0) + 1;
  return Object.entries(comptes).sort((a, b) => b[1] - a[1]).slice(0, nombre)
    .map(([v, n]) => `${nommer(v)} ${Math.round((n / valeurs.length) * 100)} %`).join(" · ") || "—";
}

// Un « visiteur » = une empreinte sur une journée (l'empreinte change chaque jour)
const cleVisiteur = (v) => `${v.visiteur}|${v.date.slice(0, 10)}`;
const nbVisiteurs = (visites) => new Set(visites.map(cleVisiteur)).size;

// La première page vue par chaque visiteur : c'est là qu'on connaît sa provenance
function arrivees(visites) {
  const premieres = {};
  for (const v of visites) {
    const cle = cleVisiteur(v);
    if (!premieres[cle] || v.date < premieres[cle].date) premieres[cle] = v;
  }
  return Object.values(premieres);
}

export async function rapportPourCyriac() {
  const maintenant = Date.now();
  const depuis = (jours) => new Date(maintenant - jours * JOUR).toISOString();

  const [visites, questions, contacts] = await Promise.all([
    lireSupabase(`portfolio_visites?select=visiteur,page,source,pays,appareil,date&date=gte.${depuis(30)}&order=date.desc&limit=1000`),
    lireSupabase(`portfolio_conversations?select=visiteur,question,date&date=gte.${depuis(30)}&order=date.desc&limit=1000`),
    lireSupabase(`portfolio_contacts?select=*&order=date.desc&limit=10`),
  ]);

  const periode = (liste, jours) => liste.filter((x) => new Date(x.date).getTime() >= maintenant - jours * JOUR);
  const v1 = periode(visites, 1), v7 = periode(visites, 7), v30 = visites;
  const a30 = arrivees(v30);
  const q7 = periode(questions, 7);

  const lignes = [
    "🔐 Rapport privé — bonjour Cyriac !",
    "",
    "**Visites**",
    `• Aujourd'hui (24 h) : ${nbVisiteurs(v1)} visiteur(s), ${v1.length} page(s) vue(s)`,
    `• 7 derniers jours : ${nbVisiteurs(v7)} visiteur(s), ${v7.length} page(s) vue(s)`,
    `• 30 derniers jours : ${nbVisiteurs(v30)} visiteur(s), ${v30.length} page(s) vue(s)`,
    "",
    "**Sur les 30 derniers jours** (part des visiteurs)",
    `• Provenance : ${top(a30.map((v) => v.source))}`,
    `• Pays : ${top(a30.map((v) => v.pays), 5, nomPays)}`,
    `• Appareils : ${top(a30.map((v) => v.appareil), 3)}`,
    `• Pages les plus vues : ${top(v30.map((v) => v.page), 5)}`,
    "",
    "**Assistant (7 derniers jours)**",
    `• ${q7.length} question(s), ${new Set(q7.map((q) => `${q.visiteur}|${q.date.slice(0, 10)}`)).size} conversation(s)`,
    ...q7.slice(0, 5).map((q) => `• [${heure(q.date)}] « ${q.question.slice(0, 90)} »`),
    "",
    `**Coordonnées laissées** (${contacts.length} récente(s))`,
    ...(contacts.length
      ? contacts.map((c) => `• [${heure(c.date)}] ${c.nom}${c.entreprise ? ` (${c.entreprise})` : ""} — ${[c.email, c.telephone].filter(Boolean).join(" · ")}${c.message ? ` — « ${c.message.slice(0, 100)} »` : ""}`)
      : ["• aucune pour l'instant"]),
  ];

  if (visites.length >= 1000) lignes.push("", "(Plus de 1 000 pages vues sur 30 jours : seules les 1 000 plus récentes sont comptées.)");
  return lignes.join("\n");
}
