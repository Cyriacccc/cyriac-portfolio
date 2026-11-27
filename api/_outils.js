// Fonctions partagées par les fonctions Vercel du portfolio (le « _ » au début du nom :
// Vercel n'en fait pas une adresse publique, c'est seulement un fichier de code commun).
import { createHash, timingSafeEqual } from "node:crypto";

// Empreinte anonyme du visiteur : on ne garde jamais son adresse IP en clair.
// Le jour fait partie du calcul, donc l'empreinte change chaque jour.
export function empreinteVisiteur(req) {
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress || "inconnu";
  const jour = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${ip}|${jour}|${process.env.SUPABASE_SERVICE_KEY}`).digest("hex").slice(0, 32);
}

function adresseSupabase() {
  return String(process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
}

function enTetesSupabase() {
  const cle = process.env.SUPABASE_SERVICE_KEY;
  return { apikey: cle, Authorization: `Bearer ${cle}`, "Content-Type": "application/json" };
}

// Écrire dans la base (insertion dans une table, ou appel d'une fonction SQL « rpc/... »)
export async function supabase(chemin, corps) {
  const enTetes = enTetesSupabase();
  if (!chemin.startsWith("rpc/")) enTetes.Prefer = "return=minimal";   // insertion : pas besoin de réponse
  const reponse = await fetch(`${adresseSupabase()}/rest/v1/${chemin}`, {
    method: "POST",
    headers: enTetes,
    body: JSON.stringify(corps),
  });
  if (!reponse.ok) throw new Error(`Supabase ${chemin} : ${reponse.status} ${await reponse.text()}`);
  return reponse.status === 204 || reponse.status === 201 ? null : reponse.json().catch(() => null);
}

// Lire une table (ex : "portfolio_visites?select=*&date=gte.2026-11-01")
export async function lireSupabase(requete) {
  const reponse = await fetch(`${adresseSupabase()}/rest/v1/${requete}`, { headers: enTetesSupabase() });
  if (!reponse.ok) throw new Error(`Supabase ${requete} : ${reponse.status} ${await reponse.text()}`);
  return reponse.json();
}

// Compare deux textes sans laisser deviner le code au temps de réponse
export function memeTexte(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}
