import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../auth.service";
import './Login.css';

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      setMessage(response.data.message);
      setEmail("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp2-root lp2-root-centered">

      {/* Left decorative panel */}
      <div className="lp2-left">
        <div className="lp2-blob lp2-blob-1" />
        <div className="lp2-blob lp2-blob-2" />
        <div className="lp2-blob lp2-blob-3" />
        <div className="lp2-left-inner">
          <div className="lp2-logo">
            <div className="lp2-logo-mark">G</div>
            <div className="lp2-logo-text">
              <span className="lp2-logo-name">GRH Anypli</span>
              <span className="lp2-logo-sub">Ressources Humaines</span>
            </div>
          </div>
          <div className="lp2-headline">
            <h1 className="lp2-title">
              Reinitialiser votre<br />
              <span className="lp2-title-accent">mot de passe</span>
            </h1>
            <p className="lp2-desc">
              Saisissez votre adresse email et nous vous enverrons un lien
              pour creer un nouveau mot de passe.
            </p>
          </div>
          <Link to="/login" className="lp2-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Retour a la connexion
          </Link>
        </div>
      </div>

      {/* Right form panel */}
      <div className="lp2-right">
        <div className="lp2-card">

          <div className="lp2-card-header">
            <div className="lp2-card-icon">
              <IconMail />
            </div>
            <h2 className="lp2-card-title">Mot de passe oublie</h2>
            <p className="lp2-card-subtitle">
              Entrez votre email pour recevoir le lien de reinitialisation.
            </p>
          </div>

          {/* Success */}
          {message && (
            <div className="lp2-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {message}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="lp2-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form className="lp2-form" onSubmit={handleSubmit}>
            <div className="lp2-field">
              <label className="lp2-label">Adresse email</label>
              <div className="lp2-input-wrap">
                <span className="lp2-input-icon"><IconMail /></span>
                <input
                  className="lp2-input"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <button className="lp2-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="lp2-spinner" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer le lien
                  <span className="lp2-submit-arrow"><IconArrow /></span>
                </>
              )}
            </button>
          </form>

          <div className="lp2-fp-back">
            <Link to="/login" className="lp2-forgot-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Retour a la connexion
            </Link>
          </div>

          <p className="lp2-footer">
            &copy; 2025 GRH Anypli — Tous droits reserves.
          </p>
        </div>
      </div>
    </div>
  );
}