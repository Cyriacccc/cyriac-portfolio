import { useEffect } from "react";

/**
 * Met à jour le titre de l'onglet et la meta description pendant qu'une page
 * est affichée, puis restaure les valeurs précédentes en la quittant.
 *
 * (Les balises <title> rendues par React s'ajoutent après celle de index.html,
 * et le navigateur garde la première : on modifie donc directement le document.
 * Le HTML prérendu de chaque page contient déjà les bonnes valeurs.)
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    const previousTitle = document.title;
    const previousDescription = meta?.getAttribute("content");

    document.title = title;
    if (meta && description) meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription) meta.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
