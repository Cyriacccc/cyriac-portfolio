"""Rapport sur l'assistant du portfolio : coordonnées laissées et questions posées.

Lit les tables Supabase portfolio_contacts et portfolio_conversations.
Il faut deux variables d'environnement sur ton PC (comme pour ta clé Anthropic) :
    setx SUPABASE_URL "https://xxxx.supabase.co"
    setx SUPABASE_SERVICE_KEY "ta-clé-secrète"
puis redémarrer VS Code.

Utilisation :
    python scripts/visites.py            # les 7 derniers jours
    python scripts/visites.py --jours 30 # les 30 derniers jours
"""
import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone


def variable(nom):
    valeur = os.environ.get(nom)
    if not valeur and sys.platform == "win32":   # variable enregistrée avec setx mais terminal pas redémarré
        import winreg
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment") as cle:
                valeur = winreg.QueryValueEx(cle, nom)[0]
        except OSError:
            pass
    if not valeur:
        sys.exit(f"Variable {nom} manquante : voir les instructions en haut de ce fichier.")
    return valeur.strip()


URL = variable("SUPABASE_URL").rstrip("/").removesuffix("/rest/v1")
CLE = variable("SUPABASE_SERVICE_KEY")


def lire(table, depuis):
    filtre = urllib.parse.urlencode({"date": f"gte.{depuis.isoformat()}", "order": "date.asc", "select": "*"})
    requete = urllib.request.Request(f"{URL}/rest/v1/{table}?{filtre}", headers={"apikey": CLE, "Authorization": f"Bearer {CLE}"})
    with urllib.request.urlopen(requete, timeout=20) as reponse:
        return json.loads(reponse.read().decode("utf-8"))


def heure(valeur):
    return datetime.fromisoformat(valeur.replace("Z", "+00:00")).astimezone().strftime("%d/%m %H:%M")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--jours", type=int, default=7)
    jours = parser.parse_args().jours
    depuis = datetime.now(timezone.utc) - timedelta(days=jours)

    contacts = lire("portfolio_contacts", depuis)
    conversations = lire("portfolio_conversations", depuis)

    print(f"=== RAPPORT DES {jours} DERNIERS JOURS ===\n")
    print(f"--- {len(contacts)} visiteur(s) ont laissé leurs coordonnées")
    for c in contacts:
        details = " · ".join(x for x in [c.get("entreprise"), c.get("email"), c.get("telephone")] if x)
        print(f"[{heure(c['date'])}] {c['nom']} — {details}")
        if c.get("message"):
            print(f"    « {c['message']} »")

    groupes = defaultdict(list)   # une empreinte = un visiteur sur une journée
    for q in conversations:
        groupes[(q["visiteur"], q["date"][:10])].append(q)
    print(f"\n--- {len(conversations)} question(s) posée(s), {len(groupes)} conversation(s)")
    for numero, (_, questions) in enumerate(sorted(groupes.items(), key=lambda g: g[1][0]["date"]), 1):
        print(f"\nConversation {numero} — {heure(questions[0]['date'])}")
        for q in questions:
            reponse = q["reponse"].replace("\n", " ")
            print(f"  Q : {q['question']}")
            print(f"  R : {reponse[:160]}{'…' if len(reponse) > 160 else ''}")


if __name__ == "__main__":
    main()
