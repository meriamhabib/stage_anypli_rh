import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import './Dashboard.css';

// ── SVG Icons ─────────────────────────────────────────────────
const IconUsers = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const IconCalendar = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const IconFile = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
);

const IconCheckSquare = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
);

const IconNews = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/>
        <path d="M15 18h-5"/>
        <path d="M10 6h8v4h-8V6Z"/>
    </svg>
);

const IconUser = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

// ── Data ──────────────────────────────────────────────────────
const stats = [
    {
        icon: <IconUsers />,
        colorClass: 'navy',
        value: '24',
        label: 'Total Employes',
        trend: '+2 ce mois',
        trendDir: 'up',
    },
    {
        icon: <IconCalendar />,
        colorClass: 'orange',
        value: '4',
        label: 'Conges en attente',
        trend: '1 urgent',
        trendDir: 'down',
    },
    {
        icon: <IconFile />,
        colorClass: 'green',
        value: '87',
        label: 'Documents',
        trend: '+12 ce mois',
        trendDir: 'up',
    },
    {
        icon: <IconCheckSquare />,
        colorClass: 'red',
        value: '7',
        label: 'Taches ouvertes',
        trend: '3 en retard',
        trendDir: 'down',
    },
];

const recentActivities = [
    { icon: <IconUser />, text: 'Nouvel employe ajoute : Sami Ben Ali', meta: 'Il y a 2 heures' },
    { icon: <IconCalendar />, text: 'Demande de conge : Fatma Mansour (5 jours)', meta: 'Il y a 4 heures' },
    { icon: <IconFile />, text: 'Document telecharge : Contrat_2025.pdf', meta: 'Hier, 15:30' },
    { icon: <IconCheckSquare />, text: 'Tache completee : Rapport Q3', meta: 'Hier, 10:00' },
    { icon: <IconNews />, text: 'Nouvelle actualite publiee', meta: '20 Juillet 2025' },
];

const quickActions = [
    { icon: <IconUser />, label: 'Ajouter un employe', path: '/employees' },
    { icon: <IconCalendar />, label: 'Gerer les conges', path: '/leave-requests' },
    { icon: <IconFile />, label: 'Ajouter un document', path: '/documents' },
    { icon: <IconCheckSquare />, label: 'Creer une tache', path: '/tasks' },
    { icon: <IconNews />, label: 'Publier une actualite', path: '/news' },
];

export default function DirecteurDashboard() {
    return (
        <AppLayout>
            <div className="page-header">
                <h1 className="page-title">Tableau de bord</h1>
                <p className="page-subtitle">Bienvenue dans votre espace Directeur RH — Anypli</p>
            </div>

            {/* Stat Cards */}
            <div className="dashboard-stats">
                {stats.map((s) => (
                    <div className="stat-card" key={s.label}>
                        <div className={`stat-card-icon ${s.colorClass}`}>{s.icon}</div>
                        <div className="stat-card-body">
                            <div className="stat-card-value">{s.value}</div>
                            <div className="stat-card-label">{s.label}</div>
                            <div className={`stat-card-trend ${s.trendDir}`}>{s.trend}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="dashboard-grid">
                {/* Recent Activity */}
                <div className="dash-card">
                    <div className="dash-card-header">
                        <span className="dash-card-title">Activite recente</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                            Aujourd'hui
                        </span>
                    </div>
                    <div className="dash-card-body">
                        <div className="activity-list">
                            {recentActivities.map((a, i) => (
                                <div className="activity-item" key={i}>
                                    <div className="activity-icon">{a.icon}</div>
                                    <div className="activity-body">
                                        <div className="activity-text">{a.text}</div>
                                        <div className="activity-meta">{a.meta}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dash-card">
                    <div className="dash-card-header">
                        <span className="dash-card-title">Actions rapides</span>
                    </div>
                    <div className="dash-card-body">
                        <div className="quick-actions">
                            {quickActions.map((a) => (
                                <Link key={a.path} to={a.path} className="quick-action-btn">
                                    <span className="quick-action-btn-icon">{a.icon}</span>
                                    <span>{a.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}