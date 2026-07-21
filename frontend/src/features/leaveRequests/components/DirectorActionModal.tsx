import { useState } from "react";
import type { LeaveRequest } from "../types/leave.types";

interface DirectorActionModalProps {
    action: "approved" | "rejected" | null;
    leave: LeaveRequest | null;
    onClose: () => void;
    onConfirm: (comment: string) => Promise<void>;
}

export default function DirectorActionModal({
    action,
    leave,
    onClose,
    onConfirm,
}: DirectorActionModalProps) {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    if (!action || !leave) return null;

    const isApprove = action === "approved";

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm(comment);
            setComment("");
            onClose();
        } catch (error) {
            console.error("Action error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="leave-modal-backdrop" onClick={onClose}>
            <div className="leave-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="leave-modal-header">
                    <h3 className="leave-modal-title" style={{ color: isApprove ? '#059669' : '#dc2626' }}>
                        {isApprove ? "Approuver la demande de congé" : "Refuser la demande de congé"}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <div className="leave-modal-body">
                    <div style={{
                        padding: '12px 16px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        fontSize: '13px',
                        lineHeight: '1.5'
                    }}>
                        <div><strong>Employé :</strong> {leave.user?.first_name} {leave.user?.last_name}</div>
                        <div><strong>Période :</strong> Du {leave.start_date} au {leave.end_date}</div>
                        <div><strong>Motif :</strong> {leave.reason}</div>
                    </div>

                    <div className="leave-form-group">
                        <label className="leave-form-label">
                            Commentaire / Observation (Optionnel)
                        </label>
                        <textarea
                            className="leave-form-textarea"
                            rows={3}
                            placeholder={isApprove ? "Remarques éventuelles pour l'employé..." : "Précisez le motif du refus..."}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                </div>

                <div className="leave-modal-footer">
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            fontWeight: 700,
                            fontSize: "13px",
                            color: "#475569",
                            cursor: "pointer"
                        }}
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                        className={isApprove ? "btn-approve" : "btn-reject"}
                        style={{ padding: "8px 18px", fontSize: "13px" }}
                    >
                        {loading ? "Traitement..." : isApprove ? "Confirmer l'approbation" : "Confirmer le refus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
