import type { LeaveRequest } from "../types/leave.types";

interface Props {
    leave: LeaveRequest;
    isDirecteur: boolean;
    onAction: (leave: LeaveRequest, action: "approved" | "rejected") => void;
}

export default function LeaveRow({ leave, isDirecteur, onAction }: Props) {
    const initials = leave.user
        ? `${leave.user.first_name?.[0] || ''}${leave.user.last_name?.[0] || ''}`.toUpperCase()
        : 'U';

    const getLeaveTypeLabel = (type: string) => {
        switch (type) {
            case 'annual': return 'Congé annuel';
            case 'sick': return 'Congé maladie';
            case 'personal': return 'Raison personnelle';
            default: return type || 'Congé';
        }
    };

    const calculateDays = (start: string, end: string) => {
        if (!start || !end) return 0;
        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const duration = calculateDays(leave.start_date, leave.end_date);
    const assignedDirector = leave.processedBy || leave.processed_by_user;

    const fileUrl = leave.medical_certificate 
        ? (leave.medical_certificate.startsWith('http') 
            ? leave.medical_certificate 
            : `http://localhost:8000/storage/${leave.medical_certificate}`)
        : null;

    return (
        <tr>
            {/* Employé */}
            <td>
                <div className="leave-user-cell">
                    <div className="leave-user-avatar">{initials}</div>
                    <div>
                        <div className="leave-user-name">
                            {leave.user?.first_name} {leave.user?.last_name}
                        </div>
                        <div className="leave-user-role">
                            {leave.user?.position || 'Employé'}
                        </div>
                    </div>
                </div>
            </td>

            {/* Type & Période */}
            <td>
                <span className="leave-type-badge">
                    {getLeaveTypeLabel(leave.leave_type)}
                </span>
                <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: '#0f172a' }}>
                    {leave.start_date} <span style={{ color: '#94a3b8' }}>➔</span> {leave.end_date}
                </div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                    Durée: {duration} jour{duration > 1 ? 's' : ''}
                </div>
            </td>

            {/* Motif */}
            <td>
                <div style={{ maxWidth: 220, fontSize: 13, color: '#334155', lineHeight: 1.4 }}>
                    {leave.reason}
                </div>
                {assignedDirector && (
                    <div style={{ marginTop: 4, fontSize: 11, color: '#64748b', fontStyle: 'italic' }}>
                        Responsable: {assignedDirector.first_name} {assignedDirector.last_name}
                    </div>
                )}
            </td>

            {/* Document / Certificat */}
            <td>
                {fileUrl ? (
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="doc-download-link"
                        title="Ouvrir le document / certificat"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="12" y1="18" x2="12" y2="12"/>
                            <polyline points="9 15 12 18 15 15"/>
                        </svg>
                        Justificatif
                    </a>
                ) : (
                    <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>Aucun</span>
                )}
            </td>

            {/* Statut */}
            <td>
                <span className={`status-pill ${leave.status}`}>
                    {leave.status === 'pending' && 'En attente'}
                    {leave.status === 'approved' && 'Approuvé'}
                    {leave.status === 'rejected' && 'Refusé'}
                </span>
                {leave.comment && (
                    <div style={{ marginTop: 4, fontSize: 11, color: '#64748b', maxWidth: 180 }}>
                        💬 {leave.comment}
                    </div>
                )}
            </td>

            {/* Actions */}
            <td>
                {isDirecteur && leave.status === 'pending' ? (
                    <div className="leave-actions-group">
                        <button
                            className="btn-approve"
                            onClick={() => onAction(leave, "approved")}
                        >
                            Approuver
                        </button>
                        <button
                            className="btn-reject"
                            onClick={() => onAction(leave, "rejected")}
                        >
                            Refuser
                        </button>
                    </div>
                ) : (
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>-</span>
                )}
            </td>
        </tr>
    );
}