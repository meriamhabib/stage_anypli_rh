import { useEffect, useState } from "react";
import { getLeaves } from "../services/leave.service";
import LeaveTable from "../components/LeaveTable";
import LeaveStats from "../components/LeaveStats";
import LeaveForm from "../components/LeaveForm";
import type { LeaveRequest } from "../types/leave.types";
import AppLayout from "../../../components/layout/AppLayout";
import "./LeaveRequests.css";

export default function LeaveRequestsPage() {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Get current user details from localStorage
    const userRaw = localStorage.getItem('user');
    const currentUser = userRaw ? JSON.parse(userRaw) : null;
    const isDirecteur = currentUser?.role === 'directeur' || currentUser?.role === 'director';

    const loadLeaves = async () => {
        setLoading(true);
        try {
            const data = await getLeaves();
            setLeaves(data);
        } catch (error) {
            console.error("Error loading leave requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLeaves();
    }, []);

    // Filter leaves for employee view (only their own requests if employee, all if director)
    const userLeaves = !isDirecteur && currentUser
        ? leaves.filter(l => l.user_id === currentUser.id)
        : leaves;

    return (
        <AppLayout>
            <div className="leave-page-container">
                {/* Header */}
                <div className="leave-page-header">
                    <div className="leave-page-title-group">
                        <h1>{isDirecteur ? "Gestion des Congés" : "Mes Demandes de Congé"}</h1>
                        <p>
                            {isDirecteur
                                ? "Consultez, validez ou refusez les demandes de congé soumises par les employés."
                                : "Soumettez une nouvelle demande de congé avec vos justificatifs et suivez leur statut."}
                        </p>
                    </div>

                    {!isDirecteur && (
                        <button
                            className="btn-primary-action"
                            onClick={() => setShowForm(!showForm)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            {showForm ? "Fermer le formulaire" : "Nouvelle demande de congé"}
                        </button>
                    )}
                </div>

                {/* Stats */}
                <LeaveStats leaves={userLeaves} />

                {/* Employee Creation Form */}
                {showForm && !isDirecteur && (
                    <LeaveForm
                        onSuccess={() => {
                            setShowForm(false);
                            loadLeaves();
                        }}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                {/* Table section */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontWeight: 600 }}>
                        Chargement des demandes de congé...
                    </div>
                ) : (
                    <LeaveTable
                        leaves={userLeaves}
                        reload={loadLeaves}
                        isDirecteur={isDirecteur}
                    />
                )}
            </div>
        </AppLayout>
    );
}