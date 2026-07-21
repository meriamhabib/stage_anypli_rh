import { useState, useEffect } from "react";
import { createLeaveRequest, getDirectors } from "../services/leave.service";
import type { LeaveType, User } from "../types/leave.types";

interface LeaveFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export default function LeaveForm({ onSuccess, onCancel }: LeaveFormProps) {
    const [leaveType, setLeaveType] = useState<LeaveType>("annual");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [processedBy, setProcessedBy] = useState<string>("");
    const [reason, setReason] = useState("");
    const [certificate, setCertificate] = useState<File | null>(null);
    const [directors, setDirectors] = useState<User[]>([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const data = await getDirectors();
                setDirectors(data);
                if (data.length > 0) {
                    setProcessedBy(data[0].id.toString());
                }
            } catch (err) {
                console.error("Failed to load directors", err);
            }
        };
        fetchDirectors();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setError("La taille du fichier ne doit pas dépasser 5 Mo.");
                return;
            }
            setCertificate(file);
            setError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate || !reason.trim()) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            setError("La date de fin ne peut pas être antérieure à la date de début.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await createLeaveRequest({
                leave_type: leaveType,
                start_date: startDate,
                end_date: endDate,
                reason,
                processed_by: processedBy ? parseInt(processedBy, 10) : undefined,
                medical_certificate: certificate,
            });
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Une erreur est survenue lors de la création de la demande.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="leave-form-card">
            <div className="leave-form-header">
                <div className="leave-form-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Nouvelle demande de congé
                </div>
                <button 
                    type="button" 
                    onClick={onCancel}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            {error && (
                <div style={{
                    padding: "10px 14px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "10px",
                    color: "#dc2626",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "16px"
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="leave-form-grid">
                    {/* Type de congé */}
                    <div className="leave-form-group">
                        <label className="leave-form-label">Type de congé *</label>
                        <select 
                            className="leave-form-select"
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                        >
                            <option value="annual">Congé annuel</option>
                            <option value="sick">Congé maladie</option>
                            <option value="personal">Raison personnelle / Autre</option>
                        </select>
                    </div>

                    {/* Directeur destinataire */}
                    <div className="leave-form-group">
                        <label className="leave-form-label">Directeur / Responsable *</label>
                        <select
                            className="leave-form-select"
                            value={processedBy}
                            onChange={(e) => setProcessedBy(e.target.value)}
                        >
                            <option value="">-- Sélectionner un directeur --</option>
                            {directors.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.first_name} {d.last_name} {d.position ? `(${d.position})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date de début */}
                    <div className="leave-form-group">
                        <label className="leave-form-label">Date de début *</label>
                        <input
                            type="date"
                            className="leave-form-input"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Date de fin */}
                    <div className="leave-form-group">
                        <label className="leave-form-label">Date de fin *</label>
                        <input
                            type="date"
                            className="leave-form-input"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Motif */}
                    <div className="leave-form-group full-width">
                        <label className="leave-form-label">Motif de l'absence *</label>
                        <textarea
                            className="leave-form-textarea"
                            rows={3}
                            placeholder="Précisez la raison de votre demande..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>

                    {/* Document / Certificat medical */}
                    <div className="leave-form-group full-width">
                        <label className="leave-form-label">Document / Certificat médical (Optionnel)</label>
                        
                        {!certificate ? (
                            <label className="leave-file-dropzone">
                                <input
                                    type="file"
                                    className="leave-file-dropzone-input"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28" style={{ color: '#64748b' }}>
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="17 8 12 3 7 8"/>
                                        <line x1="12" y1="3" x2="12" y2="15"/>
                                    </svg>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                                        Cliquez pour ajouter un certificat ou justificatif
                                    </span>
                                    <span style={{ fontSize: 12, color: '#94a3b8' }}>
                                        PDF, PNG, JPG (max. 5 Mo)
                                    </span>
                                </div>
                            </label>
                        ) : (
                            <div className="leave-file-info">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                    </svg>
                                    <span>{certificate.name}</span>
                                    <span style={{ fontSize: 11, color: '#64748b' }}>
                                        ({(certificate.size / 1024).toFixed(0)} KB)
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="leave-file-remove-btn"
                                    onClick={() => setCertificate(null)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="leave-form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: "9px 16px",
                            borderRadius: "10px",
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
                        type="submit"
                        disabled={loading}
                        className="btn-primary-action"
                    >
                        {loading ? "Envoi en cours..." : "Soumettre la demande"}
                    </button>
                </div>
            </form>
        </div>
    );
}
