import { useEffect, useRef } from "react";
import { m } from "framer-motion";

/**
 * Fenêtre modale basée sur l'élément natif <dialog>.
 *
 * showModal() apporte gratuitement :
 * - le piège du focus (Tab reste dans la fenêtre),
 * - le reste de la page rendu inerte pour les lecteurs d'écran,
 * - la fermeture avec Échap (événement « cancel »).
 *
 * Le composant rend aussi le focus à l'élément qui a ouvert la fenêtre
 * et bloque le défilement de la page en arrière-plan.
 *
 * À placer dans <AnimatePresence> : l'animation de sortie se joue
 * avant que la fenêtre ne soit fermée et retirée du DOM.
 */
export default function Modal({ label, onClose, className = "", children, ...motionProps }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  return (
    <m.dialog
      ref={dialogRef}
      className={`modal-dialog ${className}`}
      aria-label={label}
      onCancel={(event) => {
        // On garde la fenêtre ouverte le temps de l'animation de sortie.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Clic sur le fond (le <dialog> lui-même) : fermeture.
        if (event.target === event.currentTarget) onClose();
      }}
      {...motionProps}
    >
      {children}
    </m.dialog>
  );
}
