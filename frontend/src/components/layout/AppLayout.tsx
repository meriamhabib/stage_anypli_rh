import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AppLayout.css';

// ── SVG Icon Components ───────────────────────────────────────
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const IconNews = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M18 14h-8"/>
    <path d="M15 18h-5"/>
    <path d="M10 6h8v4h-8V6Z"/>
  </svg>
);

const IconCheckSquare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

// ── Types ─────────────────────────────────────────────────────
interface NavItem {
    path: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const isDirecteur = user?.role === 'directeur' || user?.role === 'director';

    const displayName = (user?.first_name || user?.last_name)
        ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
        : user?.name || user?.email || 'Utilisateur';

    const initials = (user?.first_name && user?.last_name)
        ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
        : (displayName ? displayName.slice(0, 2).toUpperCase() : 'U');

    const displayRole = isDirecteur ? 'Directeur RH' : 'Employé';

    const directorNav: NavItem[] = [
        { path: '/directeur', label: 'Dashboard', icon: <IconDashboard /> },
        { path: '/employees', label: 'Employes', icon: <IconUsers /> },
        { path: '/leave-requests', label: 'Conges', icon: <IconCalendar />, badge: 4 },
        { path: '/documents', label: 'Documents', icon: <IconFile /> },
        { path: '/news', label: 'Actualites', icon: <IconNews /> },
        { path: '/tasks', label: 'To-Do List', icon: <IconCheckSquare /> },
    ];

    const employeeNav: NavItem[] = [
        { path: '/employee', label: 'Dashboard', icon: <IconDashboard /> },
        { path: '/leave-requests', label: 'Mes conges', icon: <IconCalendar /> },
        { path: '/documents', label: 'Documents', icon: <IconFile /> },
        { path: '/tasks', label: 'Mes taches', icon: <IconCheckSquare /> },
    ];

    const navItems = isDirecteur ? directorNav : employeeNav;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className="app-sidebar">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">G</div>
                    <span className="sidebar-logo-text">GRH Anypli</span>
                </div>

                <nav className="sidebar-nav">
                    <span className="sidebar-section-label">Menu Principal</span>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="sidebar-nav-icon">{item.icon}</span>
                            {item.label}
                            {item.badge && (
                                <span className="sidebar-nav-badge">{item.badge}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <Link
                        to="/profile"
                        className={`sidebar-nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                    >
                        <span className="sidebar-nav-icon"><IconUser /></span>
                        Profil
                    </Link>
                    <button className="sidebar-nav-link" onClick={handleLogout}>
                        <span className="sidebar-nav-icon"><IconLogout /></span>
                        Deconnexion
                    </button>

                    <div className="sidebar-user" style={{ marginTop: '8px' }}>
                        <div className="sidebar-user-avatar">{initials}</div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">{displayName}</div>
                            <div className="sidebar-user-role">{displayRole}</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main area */}
            <div className="app-main">
                {/* Topbar */}
                <header className="app-topbar">
                    <div className="topbar-search">
                        <span className="topbar-search-icon"><IconSearch /></span>
                        <input placeholder="Rechercher employes, documents..." />
                    </div>

                    <div className="topbar-actions">
                        <a href="#notifications" className="topbar-icon-btn" title="Notifications">
                            <IconBell />
                            <span className="topbar-badge">2</span>
                        </a>

                        <div className="topbar-user">
                            <div className="topbar-avatar">{initials}</div>
                            <div className="topbar-user-info">
                                <div className="topbar-user-name">{displayName}</div>
                                <div className="topbar-user-role">{displayRole}</div>
                            </div>
                        </div>
                    </div>
                </header>


                {/* Page Content */}
                <main className="app-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
