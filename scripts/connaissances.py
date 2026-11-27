"""Rassemble tout ce que l'assistant du portfolio doit savoir dans api/_connaissances.js.

Sources :
  1. les pages du portfolio (le HTML prérendu dans dist/ : lancer `npm run build` avant)
  2. le CV (public/CV-Cyriac-Dupouey.pdf)
  3. le profil LinkedIn (scripts/sources/linkedin.md : à mettre à jour à la main, LinkedIn interdit la lecture automatique)
  4. les dépôts GitHub publics et leurs README (lus sur l'API GitHub)

Utilisation (depuis le dossier du portfolio) :
    npm run build
    python scripts/connaissances.py
Puis relire api/_connaissances.js : c'est exactement ce que l'assistant saura.
"""
import json
import re
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
GITHUB = "Cyriacccc"
DEPOTS_EXCLUS = {"hello-xorld"}          # dépôts publics à ne pas présenter (vides, sans intérêt...)
MAX_README = 3000                       # caractères gardés par README


class TexteVisible(HTMLParser):
    """Garde seulement le texte affiché d'une page HTML (pas les scripts, styles ni dessins)."""
    IGNORES = {"script", "style", "svg", "noscript", "template", "head"}

    def __init__(self):
        super().__init__()
        self.morceaux, self.profondeur_ignoree = [], 0

    def handle_starttag(self, tag, attrs):
        if tag in self.IGNORES:
            self.profondeur_ignoree += 1
        elif tag in {"p", "div", "section", "li", "h1", "h2", "h3", "h4", "br", "article", "footer"}:
            self.morceaux.append("\n")

    def handle_endtag(self, tag):
        if tag in self.IGNORES and self.profondeur_ignoree:
            self.profondeur_ignoree -= 1

    def handle_data(self, data):
        if not self.profondeur_ignoree and data.strip():
            self.morceaux.append(data.strip() + " ")

    def texte(self):
        brut = "".join(self.morceaux)
        lignes = [re.sub(r"\s+", " ", ligne).strip() for ligne in brut.splitlines()]
        return "\n".join(ligne for ligne in lignes if ligne)


def pages_du_portfolio():
    parties = []
    for chemin in [RACINE / "dist" / "index.html", *sorted((RACINE / "dist" / "projects").glob("*.html"))]:
        lecteur = TexteVisible()
        lecteur.feed(chemin.read_text(encoding="utf-8"))
        nom = "Accueil" if chemin.name == "index.html" else f"Page projet « {chemin.stem} »"
        parties.append(f"### {nom}\n{lecteur.texte()}")
    return "\n\n".join(parties)


def cv():
    from pypdf import PdfReader
    lecteur = PdfReader(RACINE / "public" / "CV-Cyriac-Dupouey.pdf")
    return "\n".join(page.extract_text() or "" for page in lecteur.pages).strip()


def lire_url(url, accept="application/vnd.github+json"):
    requete = urllib.request.Request(url, headers={"Accept": accept, "User-Agent": "portfolio-connaissances"})
    with urllib.request.urlopen(requete, timeout=20) as reponse:
        return reponse.read().decode("utf-8", errors="ignore")


def github():
    depots = json.loads(lire_url(f"https://api.github.com/users/{GITHUB}/repos?per_page=100&type=owner&sort=updated"))
    parties = []
    for d in depots:
        if d["fork"] or d["private"] or d["name"] in DEPOTS_EXCLUS:
            continue
        try:
            readme = lire_url(f"https://api.github.com/repos/{GITHUB}/{d['name']}/readme", "application/vnd.github.raw")
            readme = readme.strip()[:MAX_README]
        except Exception:
            readme = "(pas de README)"
        parties.append(
            f"### {d['name']} — {d['html_url']}\n"
            f"Description : {d['description'] or 'aucune'} · Langage principal : {d['language'] or '?'} · "
            f"Dernière mise à jour : {d['updated_at'][:10]}\n"
            f"README :\n{readme}"
        )
    return "\n\n".join(parties)


def main():
    texte = (
        f"(Connaissances rassemblées le {date.today().strftime('%d/%m/%Y')})\n\n"
        f"## 1. LE PORTFOLIO (texte des pages du site)\n\n{pages_du_portfolio()}\n\n"
        f"## 2. LE CV (PDF téléchargeable sur le portfolio)\n\n{cv()}\n\n"
        f"## 3. LE PROFIL LINKEDIN\n\n{(RACINE / 'scripts' / 'sources' / 'linkedin.md').read_text(encoding='utf-8')}\n\n"
        f"## 4. LES DÉPÔTS GITHUB PUBLICS (github.com/{GITHUB})\n\n{github()}\n"
    )
    sortie = RACINE / "api" / "_connaissances.js"
    sortie.parent.mkdir(exist_ok=True)
    sortie.write_text(
        "// Fichier GÉNÉRÉ par scripts/connaissances.py : ne pas modifier à la main.\n"
        "// C'est tout ce que l'assistant du portfolio sait sur Cyriac.\n"
        f"export const CONNAISSANCES = {json.dumps(texte, ensure_ascii=False)};\n",
        encoding="utf-8",
    )
    print(f"{sortie.relative_to(RACINE)} : {len(texte)} caractères (environ {len(texte) // 4} tokens)")


if __name__ == "__main__":
    main()
