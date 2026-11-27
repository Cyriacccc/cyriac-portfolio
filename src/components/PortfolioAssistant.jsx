import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, RotateCcw } from "lucide-react";
import "../styles/assistant.css";

// Assistant du portfolio : une bulle en bas à droite qui répond aux questions sur Cyriac.
// Les réponses viennent de la fonction Vercel /api/assistant (la clé API reste sur le serveur).

const SUGGESTIONS = [
  "Quels projets en IA a-t-il réalisés ?",
  "Quelle est sa formation ?",
  "Comment le contacter ?",
];

const ACCUEIL =
  "Bonjour ! Je suis l'assistant de Cyriac. Posez-moi vos questions sur son parcours, ses projets, ses compétences ou ses disponibilités. (I also speak English.)";

// Affiche un texte avec le **gras** et les liens cliquables, sans jamais injecter de HTML
function TexteRiche({ texte }) {
  const morceaux = texte.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|(?:github\.com|linkedin\.com)\/[^\s),]+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return morceaux.map((morceau, i) => {
    if (/^\*\*[^*]+\*\*$/.test(morceau)) return <strong key={i}>{morceau.slice(2, -2)}</strong>;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(morceau)) return <a key={i} href={`mailto:${morceau}`}>{morceau}</a>;
    if (/^(https?:\/\/|github\.com|linkedin\.com)/.test(morceau)) {
      const url = morceau.startsWith("http") ? morceau : `https://${morceau}`;
      return <a key={i} href={url} target="_blank" rel="noreferrer">{morceau}</a>;
    }
    return morceau;
  });
}

export default function PortfolioAssistant() {
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState([]); // [{ role: "user" | "assistant", content }]
  const [saisie, setSaisie] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");
  const [restants, setRestants] = useState(null);

  const finRef = useRef(null);
  const champRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, enCours, ouvert]);

  useEffect(() => {
    if (ouvert) champRef.current?.focus();
  }, [ouvert]);

  async function envoyer(texte) {
    const question = texte.trim();
    if (!question || enCours) return;

    const nouveaux = [...messages, { role: "user", content: question }];
    setMessages(nouveaux);
    setSaisie("");
    setErreur("");
    setEnCours(true);

    try {
      // Claude ne retient rien : on envoie toute la conversation à chaque question
      const reponse = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nouveaux }),
      });
      const data = await reponse.json().catch(() => ({}));
      if (!reponse.ok) throw new Error(data.error || "L'assistant ne répond pas. Réessayez plus tard.");
      setMessages([...nouveaux, { role: "assistant", content: data.reponse }]);
      if (typeof data.restants === "number") setRestants(data.restants);
    } catch (e) {
      setErreur(e.message);
      setMessages(messages); // on retire la question pour pouvoir la renvoyer
      setSaisie(question);
    }

    setEnCours(false);
  }

  if (!ouvert) {
    return (
      <button type="button" className="pa-bulle" onClick={() => setOuvert(true)} aria-label="Ouvrir l'assistant de Cyriac">
        <MessageCircle size={20} />
        <span>Une question ?</span>
      </button>
    );
  }

  return (
    <section className="pa-panneau" role="dialog" aria-label="Assistant de Cyriac">
      <header className="pa-entete">
        <div>
          <span className="pa-label">ASSISTANT IA</span>
          <strong>Posez vos questions sur Cyriac</strong>
        </div>
        <div className="pa-actions">
          {messages.length > 0 && (
            <button type="button" onClick={() => { setMessages([]); setErreur(""); }} aria-label="Nouvelle conversation" title="Nouvelle conversation">
              <RotateCcw size={16} />
            </button>
          )}
          <button type="button" onClick={() => setOuvert(false)} aria-label="Fermer l'assistant" title="Fermer">
            <X size={18} />
          </button>
        </div>
      </header>

      <div className="pa-fil">
        <div className="pa-message pa-bot">{ACCUEIL}</div>

        {messages.length === 0 && (
          <div className="pa-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => envoyer(s)}>{s}</button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`pa-message ${m.role === "user" ? "pa-moi" : "pa-bot"}`}>
            {m.role === "assistant" ? <TexteRiche texte={m.content} /> : m.content}
          </div>
        ))}

        {enCours && (
          <div className="pa-message pa-bot pa-attente" aria-label="L'assistant écrit">
            <span /><span /><span />
          </div>
        )}

        {erreur && <div className="pa-erreur">{erreur}</div>}
        <div ref={finRef} />
      </div>

      <form className="pa-saisie" onSubmit={(e) => { e.preventDefault(); envoyer(saisie); }}>
        <input
          ref={champRef}
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          placeholder="Votre question…"
          maxLength={1000}
          disabled={enCours}
          aria-label="Votre question"
        />
        <button type="submit" disabled={enCours || !saisie.trim()} aria-label="Envoyer">
          <Send size={17} />
        </button>
      </form>

      <p className="pa-pied">
        Réponses générées par IA à partir du portfolio, du CV, de LinkedIn et de GitHub.
        {restants !== null && ` · ${restants} question${restants > 1 ? "s" : ""} restante${restants > 1 ? "s" : ""} aujourd'hui`}
      </p>
    </section>
  );
}
