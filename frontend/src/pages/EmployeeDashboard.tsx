import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import './Dashboard.css';

// ── SVG Icons ─────────────────────────────────────────────────
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

// ── Data ──────────────────────────────────────────────────────
const stats = [
    {
        icon: <IconCalendar />,
        colorClass: 'orange',
        value: '12',
        label: 'Jours de conge restants',
        trend: 'Sur 30 jours',
        trendDir: 'up',
    },
    {
        icon: <IconCheckSquare />,
        colorClass: 'red',
        value: '3',
        label: 'Taches en cours',
        trend: '1 en retard',
        trendDir: 'down',
    },
    {
        icon: <IconFile />,
        colorClass: 'green',
        value: '5',
        label: 'Mes documents',
        trend: '2 nouveaux',
        trendDir: 'up',
    },
    {
        icon: <IconNews />,
        colorClass: 'navy',
        value: '2',
        label: 'Actualites non lues',
        trend: 'Cette semaine',
        trendDir: 'up',
    },
];

const myTasks = [
    { title: 'Revision du rapport Q3', priority: 'high', status: 'in_progress' },
    { title: 'Mise a jour des politiques RH', priority: 'medium', status: 'to_do' },
    { title: 'Preparation formation', priority: 'medium', status: 'to_do' },
];

export default function EmployeeDashboard() {
    return (
        <AppLayout>
            <div className="page-header">
                <h1 className="page-title">Mon Espace</h1>
                <p className="page-subtitle">Bienvenue dans votre espace employe</p>
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

            <div className="dashboard-grid">
                {/* My Tasks */}
                <div className="dash-card">
                    <div className="dash-card-header">
                        <span className="dash-card-title">Mes taches recentes</span>
                        <Link to="/tasks" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                            Voir tout
                        </Link>
                    </div>
                    <div className="dash-card-body">
                        <div className="activity-list">
                            {myTasks.map((t, i) => (
                                <div className="activity-item" key={i}>
                                    <div className="activity-icon"><IconCheckSquare /></div>
                                    <div className="activity-body">
                                        <div className="activity-text">{t.title}</div>
                                        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                            <span
                                                className={`status-badge ${
                                                    t.priority === 'high' ? 'rejected' :
                                                    t.priority === 'medium' ? 'pending' : 'approved'
                                                }`}
                                            >
                                                {t.priority}
                                            </span>
                                            <span className={`status-badge ${
                                                t.status === 'in_progress' ? 'pending' : 'approved'
                                            }`}>
                                                {t.status === 'in_progress' ? 'En cours' : 'A faire'}
                                            </span>
                                        </div>
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
                            <Link to="/tasks" className="quick-action-btn">
                                <span className="quick-action-btn-icon"><IconCheckSquare /></span>
                                <span>Mes taches</span>
                            </Link>
                            <Link to="/leave-requests" className="quick-action-btn">
                                <span className="quick-action-btn-icon"><IconCalendar /></span>
                                <span>Demander un conge</span>
                            </Link>
                            <Link to="/documents" className="quick-action-btn">
                                <span className="quick-action-btn-icon"><IconFile /></span>
                                <span>Mes documents</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}