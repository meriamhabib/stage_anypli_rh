import type { LeaveRequest } from "../types/leave.types";

interface Props {
    leaves: LeaveRequest[];
}

export default function LeaveStats({ leaves }: Props) {
    const total = leaves.length;
    const pending = leaves.filter((l) => l.status === "pending").length;
    const approved = leaves.filter((l) => l.status === "approved").length;
    const rejected = leaves.filter((l) => l.status === "rejected").length;

    const stats = [
        {
            label: "Total Demandes",
            value: total,
            type: "total",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            )
        },
        {
            label: "En attente",
            value: pending,
            type: "pending",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            )
        },
        {
            label: "Approuvés",
            value: approved,
            type: "approved",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            )
        },
        {
            label: "Refusés",
            value: rejected,
            type: "rejected",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            )
        }
    ];

    return (
        <div className="leave-stats-grid">
            {stats.map((s) => (
                <div key={s.label} className="leave-stat-card">
                    <div className={`leave-stat-icon ${s.type}`}>
                        {s.icon}
                    </div>
                    <div>
                        <div className="leave-stat-val">{s.value}</div>
                        <div className="leave-stat-lbl">{s.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}