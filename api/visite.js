// =====================================================================
// Compteur de visites anonyme du portfolio — fonction Vercel
// Appelée par le site à chaque page vue. On enregistre seulement :
//   la page, la provenance (le site d'où vient le visiteur), le pays, le type d'appareil,
//   et l'empreinte anonyme du jour (pour compter les visiteurs différents).
// Pas de cookies, pas d'adresse IP en clair.
// =====================================================================
import { empreinteVisiteur, supabase } from "./_outils.js";

const ROBOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel/i;

// Le site d'où vient le visiteur : "linkedin.com", "google.com"... ou "direct" (lien tapé ou favori)
function provenance(referrer, hoteDuSite) {
  try {
    const hote = new URL(referrer).hostname.replace(/^www\.|^m\.|^l\./, "");
    if (!hote || hote === hoteDuSite) return "direct";
    if (hote.includes("linkedin") || hote === "lnkd.in") return "linkedin.com";
    if (hote.includes("google.")) return "google";
    return hote;
  } catch {
    return "direct";
  }
}

function appareil(userAgent) {
  if (/iPad|Tablet/i.test(userAgent)) return "tablette";
  if (/Mobi|Android|iPhone/i.test(userAgent)) return "téléphone";
  return "ordinateur";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const userAgent = String(req.headers["user-agent"] || "");
  if (ROBOTS.test(userAgent)) return res.status(204).end();   // on ne compte pas les robots

  let corps = req.body || {};
  if (typeof corps === "string") {
    try { corps = JSON.parse(corps || "{}"); } catch { corps = {}; }
  }

  const page = String(corps.page || "/").slice(0, 200);
  const hoteDuSite = String(req.headers.host || "").replace(/^www\./, "");

  try {
    await supabase("portfolio_visites", {
      visiteur: empreinteVisiteur(req),
      page,
      source: provenance(String(corps.referrer || ""), hoteDuSite),
      pays: String(req.headers["x-vercel-ip-country"] || "?").slice(0, 4),   // pays fourni par Vercel
      appareil: appareil(userAgent),
    });
  } catch (e) {
    console.error("Visite :", e);
  }
  return res.status(204).end();
}
