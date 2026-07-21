import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import './components/Login.css';

// SVG Icons
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const IconKanban = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="5" height="18" rx="1"/>
    <rect x="10" y="3" width="5" height="11" rx="1"/>
    <rect x="17" y="3" width="5" height="14" rx="1"/>
  </svg>
);

// Features list
const features = [
  { icon: <IconUsers />,   label: 'Gestion des employes' },
  { icon: <IconCalendar />, label: 'Suivi des conges' },
  { icon: <IconFile />,    label: 'Gestion documentaire' },
  { icon: <IconKanban />,  label: 'To-Do Kanban interactif' },
];

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPwd1, setShowPwd1] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.post("/reset-password", {
                token,
                password,
                password_confirmation: passwordConfirmation,
            });

            setSuccess(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lp2-root">
            {/* ── LEFT PANEL ── */}
            <div className="lp2-left">
                {/* Decorative blobs */}
                <div className="lp2-blob lp2-blob-1" />
                <div className="lp2-blob lp2-blob-2" />
                <div className="lp2-blob lp2-blob-3" />

                <div className="lp2-left-inner">
                    {/* Logo */}
                    <div className="lp2-logo">
                        <div className="lp2-logo-mark">G</div>
                        <div className="lp2-logo-text">
                            <span className="lp2-logo-name">GRH Anypli</span>
                            <span className="lp2-logo-sub">Ressources Humaines</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="lp2-headline">
                        <h1 className="lp2-title">
                            Creer votre<br />
                            <span className="lp2-title-accent">mot de passe</span>
                        </h1>
                        <p className="lp2-desc">
                            Saisissez votre nouveau mot de passe pour acceder a votre espace.
                        </p>
                    </div>

                    {/* Feature list */}
                    <ul className="lp2-features">
                        {features.map((f, i) => (
                            <li className="lp2-feature" key={i}>
                                <span className="lp2-feature-check"><IconCheck /></span>
                                <span className="lp2-feature-icon">{f.icon}</span>
                                <span className="lp2-feature-label">{f.label}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Back to login */}
                    <Link to="/login" className="lp2-back-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Retour a la connexion
                    </Link>
                </div>
            </div>

            {/* ── RIGHT PANEL (FORM) ── */}
            <div className="lp2-right">
                <div className="lp2-card">
                    {/* Card Header */}
                    <div className="lp2-card-header">
                        <div className="lp2-card-icon">
                            <IconLock />
                        </div>
                        <h2 className="lp2-card-title">Nouveau mot de passe</h2>
                        <p className="lp2-card-subtitle">Choisissez un mot de passe securise.</p>
                    </div>

                    {/* Success */}
                    {success && (
                        <div className="lp2-success">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {success}
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

                    {/* Form */}
                    <form className="lp2-form" onSubmit={handleSubmit}>
                        {/* Password */}
                        <div className="lp2-field">
                            <label className="lp2-label">Mot de passe</label>
                            <div className="lp2-input-wrap">
                                <span className="lp2-input-icon"><IconLock /></span>
                                <input
                                    className="lp2-input lp2-input-pwd"
                                    type={showPwd1 ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="lp2-eye-btn"
                                    onClick={() => setShowPwd1(!showPwd1)}
                                    tabIndex={-1}
                                >
                                    {showPwd1 ? <IconEyeOff /> : <IconEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="lp2-field">
                            <label className="lp2-label">Confirmer le mot de passe</label>
                            <div className="lp2-input-wrap">
                                <span className="lp2-input-icon"><IconLock /></span>
                                <input
                                    className="lp2-input lp2-input-pwd"
                                    type={showPwd2 ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="lp2-eye-btn"
                                    onClick={() => setShowPwd2(!showPwd2)}
                                    tabIndex={-1}
                                >
                                    {showPwd2 ? <IconEyeOff /> : <IconEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button className="lp2-submit" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="lp2-spinner" />
                                    Enregistrement en cours...
                                </>
                            ) : (
                                <>
                                    Enregistrer le mot de passe
                                    <span className="lp2-submit-arrow"><IconArrow /></span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="lp2-footer">
                        &copy; 2025 GRH Anypli — Tous droits reserves.
                    </p>
                </div>
            </div>
        </div>
    );
}