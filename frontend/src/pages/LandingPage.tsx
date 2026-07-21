import { Link } from 'react-router-dom';
import './LandingPage.css';

// ── SVG Icons ────────────────────────────────────────────────
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
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconKanban = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="5" height="18" rx="1"/>
    <rect x="10" y="3" width="5" height="11" rx="1"/>
    <rect x="17" y="3" width="5" height="14" rx="1"/>
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconNews = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M18 14h-8"/>
    <path d="M15 18h-5"/>
    <path d="M10 6h8v4h-8V6Z"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────
const features = [
  {
    icon: <IconUsers />,
    title: 'Gestion des Employes',
    desc: 'Centralisez tous les dossiers de vos collaborateurs. Accedez aux informations en un seul clic et suivez l\'evolution de chaque profil.',
  },
  {
    icon: <IconCalendar />,
    title: 'Suivi des Conges',
    desc: 'Soumettez, validez et suivez les demandes de conge et d\'absence avec un flux d\'approbation clair et transparent.',
  },
  {
    icon: <IconFile />,
    title: 'Gestion Documentaire',
    desc: 'Stockez et partagez vos contrats, fiches de paie et documents RH en toute securite, accessibles a tout moment.',
  },
  {
    icon: <IconKanban />,
    title: 'Kanban & To-Do',
    desc: 'Planifiez et suivez les taches de vos equipes grace a un tableau Kanban intuitif et des listes de taches collaboratives.',
  },
  {
    icon: <IconNews />,
    title: 'Actualites Internes',
    desc: 'Communiquez avec vos equipes via un fil d\'actualites interne. Partagez les nouvelles importantes en temps reel.',
  },
  {
    icon: <IconChart />,
    title: 'Tableau de Bord',
    desc: 'Visualisez vos indicateurs RH cles — effectifs, conges, taches — depuis un tableau de bord complet et en temps reel.',
  },
];

const advantages = [
  'Plateforme 100% securisee et confidentielle',
  'Interface intuitive, aucune formation requise',
  'Acces multi-roles : Directeur & Employes',
  'Deploiement rapide et personnalisable',
  'Support et mises a jour inclus',
];

const stats = [
  { value: '100%', label: 'Securite des donnees' },
  { value: '3x', label: 'Gain de productivite' },
  { value: '24/7', label: 'Acces a la plateforme' },
  { value: '5 min', label: 'Temps de prise en main' },
];

// ── Component ─────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="lp-root">

      {/* NAV */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-logo">
            <div className="lp-logo-mark">G</div>
            <span className="lp-logo-text">GRH <strong>Anypli</strong></span>
          </div>

          <nav className="lp-nav-links">
            <a href="#features" className="lp-nav-link">Fonctionnalites</a>
            <a href="#avantages" className="lp-nav-link">Avantages</a>
            <a href="#stats-section" className="lp-nav-link">Resultats</a>
          </nav>

          <div className="lp-nav-cta">
            <Link to="/login" className="lp-btn lp-btn-outline">Connexion</Link>
          </div>

          <button className="lp-hamburger" aria-label="Menu">
            <IconMenu />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-bg-shapes">
          <div className="lp-shape lp-shape-1" />
          <div className="lp-shape lp-shape-2" />
          <div className="lp-shape lp-shape-3" />
        </div>

        <div className="lp-hero-inner">
          <div className="lp-hero-badge">
            <span className="lp-badge-dot" />
            Solution RH Professionnelle
          </div>

          <h1 className="lp-hero-title">
            La gestion RH,<br />
            <span className="lp-hero-title-accent">reinventee pour vous</span>
          </h1>

          <p className="lp-hero-subtitle">
            GRH Anypli centralise l'ensemble de vos processus ressources humaines
            — employes, conges, documents et taches — dans une plateforme unique,
            moderne et securisee.
          </p>

          <div className="lp-hero-actions">
            <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg">
              Acceder a la plateforme
              <span className="lp-btn-icon"><IconArrow /></span>
            </Link>
            <a href="#features" className="lp-btn lp-btn-ghost lp-btn-lg">
              Decouvrir les fonctionnalites
            </a>
          </div>

          <div className="lp-hero-stats" id="stats-section">
            {stats.map((s) => (
              <div className="lp-hero-stat" key={s.label}>
                <span className="lp-hero-stat-value">{s.value}</span>
                <span className="lp-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative illustration */}
        <div className="lp-hero-visual">
          <div className="lp-illustration">
            <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="lp-illustration-svg">
              {/* Smartphone frame */}
              <rect x="30" y="20" width="340" height="460" rx="30" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
              
              {/* Screen */}
              <rect x="45" y="50" width="310" height="400" rx="20" fill="#f9fafb"/>
              
              {/* Status bar */}
              <rect x="45" y="50" width="310" height="35" rx="20" fill="#6b7280"/>
              <text x="60" y="73" fontSize="12" fill="white" fontWeight="600">GRH Anypli</text>
              
              {/* Top card - animated */}
              <g className="lp-card-float-1">
                <rect x="60" y="100" width="280" height="70" rx="12" fill="white" stroke="#dc2626" strokeWidth="2"/>
                <text x="75" y="120" fontSize="24" fontWeight="900" fill="#dc2626">24</text>
                <text x="75" y="145" fontSize="12" fill="#6b7280" fontWeight="600">Employes</text>
                <circle cx="330" cy="125" r="15" fill="#dc2626" opacity="0.1"/>
              </g>
              
              {/* Middle cards - animated */}
              <g className="lp-card-float-2">
                <rect x="60" y="185" width="130" height="60" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5"/>
                <text x="75" y="202" fontSize="20" fontWeight="800" fill="#dc2626">4</text>
                <text x="75" y="220" fontSize="11" fill="#6b7280" fontWeight="600">Conges</text>
              </g>
              
              <g className="lp-card-float-3">
                <rect x="210" y="185" width="130" height="60" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5"/>
                <text x="225" y="202" fontSize="20" fontWeight="800" fill="#22c55e">87</text>
                <text x="225" y="220" fontSize="11" fill="#6b7280" fontWeight="600">Documents</text>
              </g>
              
              {/* Bottom card - animated */}
              <g className="lp-card-float-1">
                <rect x="60" y="260" width="280" height="70" rx="12" fill="#fef3c7" opacity="0.6"/>
                <text x="75" y="285" fontSize="20" fontWeight="800" fill="#dc2626">★ Performance</text>
                <text x="75" y="305" fontSize="12" fill="#6b7280" fontWeight="500">+40% de productivite</text>
              </g>
              
              {/* Decorative dots */}
              <circle cx="90" cy="350" r="3" fill="#dc2626" opacity="0.4"/>
              <circle cx="110" cy="360" r="2.5" fill="#dc2626" opacity="0.3"/>
              <circle cx="130" cy="355" r="2" fill="#dc2626" opacity="0.2"/>
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features" id="features">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <span className="lp-section-label">Fonctionnalites</span>
            <h2 className="lp-section-title">
              Tout ce dont vous avez besoin,<br />en un seul endroit
            </h2>
            <p className="lp-section-desc">
              Une suite complete d'outils RH concue pour les entreprises modernes,
              avec une experience utilisateur pensee pour chaque collaborateur.
            </p>
          </div>

          <div className="lp-features-grid">
            {features.map((f, i) => (
              <div className="lp-feature-card" key={i}>
                <div className="lp-feature-icon-wrap">
                  {f.icon}
                </div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="lp-advantages" id="avantages">
        <div className="lp-section-inner lp-advantages-inner">
          <div className="lp-advantages-text">
            <span className="lp-section-label lp-section-label-light">Pourquoi nous choisir</span>
            <h2 className="lp-section-title lp-section-title-light">
              Une plateforme taillee pour la performance RH
            </h2>
            <p className="lp-section-desc lp-section-desc-light">
              GRH Anypli a ete concu avec les equipes RH pour repondre aux defis reels
              du quotidien. Securite, simplicite et efficacite sont au coeur de chaque fonctionnalite.
            </p>

            <ul className="lp-advantages-list">
              {advantages.map((a, i) => (
                <li key={i} className="lp-advantage-item">
                  <span className="lp-advantage-check"><IconCheck /></span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <Link to="/login" className="lp-btn lp-btn-primary lp-btn-lg lp-advantages-cta">
              Commencer maintenant
              <span className="lp-btn-icon"><IconArrow /></span>
            </Link>
          </div>

          <div className="lp-advantages-visual">
            <div className="lp-adv-card lp-adv-card-1">
              <div className="lp-adv-icon"><IconShield /></div>
              <div>
                <div className="lp-adv-card-title">Securite maximale</div>
                <div className="lp-adv-card-desc">Donnees chiffrees, acces controles par roles</div>
              </div>
            </div>
            <div className="lp-adv-card lp-adv-card-2">
              <div className="lp-adv-icon"><IconZap /></div>
              <div>
                <div className="lp-adv-card-title">Performance optimale</div>
                <div className="lp-adv-card-desc">Interface reactive et temps de chargement minimal</div>
              </div>
            </div>
            <div className="lp-adv-card lp-adv-card-3">
              <div className="lp-adv-icon"><IconUsers /></div>
              <div>
                <div className="lp-adv-card-title">Multi-utilisateurs</div>
                <div className="lp-adv-card-desc">Directeurs et employes avec espaces dedies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <div className="lp-section-inner lp-cta-inner">
          <h2 className="lp-cta-title">
            Pret a moderniser votre gestion RH ?
          </h2>
          <p className="lp-cta-desc">
            Rejoignez des maintenant la plateforme GRH Anypli et transformez votre facon de gerer vos ressources humaines.
          </p>
          <Link to="/login" className="lp-btn lp-btn-white lp-btn-lg">
            Acceder a la plateforme
            <span className="lp-btn-icon lp-btn-icon-red"><IconArrow /></span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-logo">
              <div className="lp-logo-mark">G</div>
              <span className="lp-logo-text lp-logo-text-light">GRH <strong>Anypli</strong></span>
            </div>
            <p className="lp-footer-tagline">
              La solution RH moderne pour les entreprises performantes.
            </p>
          </div>

          <div className="lp-footer-links">
            <span className="lp-footer-link-title">Plateforme</span>
            <a href="#features" className="lp-footer-link">Fonctionnalites</a>
            <a href="#avantages" className="lp-footer-link">Avantages</a>
            <Link to="/login" className="lp-footer-link">Connexion</Link>
          </div>

          <div className="lp-footer-links">
            <span className="lp-footer-link-title">Contact</span>
            <span className="lp-footer-link">contact@anypli.com</span>
            <span className="lp-footer-link">+216 XX XXX XXX</span>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>2025 GRH Anypli — Tous droits reserves.</span>
          <span>Developpe par Anypli</span>
        </div>
      </footer>

    </div>
  );
}
