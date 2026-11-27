import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Compteur de visites anonyme : prévient /api/visite à chaque page vue.
// N'affiche rien. Pas de cookies, aucune donnée personnelle envoyée.
let premierePage = true;

export default function CompteurVisites() {
  const { pathname } = useLocation();

  useEffect(() => {
    // La provenance (document.referrer) n'a de sens qu'à l'arrivée sur le site
    const donnees = { page: pathname, referrer: premierePage ? document.referrer : "" };
    premierePage = false;

    const corps = new Blob([JSON.stringify(donnees)], { type: "application/json" });
    // sendBeacon : envoi discret, qui ne ralentit pas la page (et part même si on la quitte)
    if (!navigator.sendBeacon?.("/api/visite", corps)) {
      fetch("/api/visite", { method: "POST", body: corps, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
