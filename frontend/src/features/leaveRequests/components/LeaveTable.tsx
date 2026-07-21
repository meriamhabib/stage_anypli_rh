import { useState } from "react";
import type { LeaveRequest } from "../types/leave.types";
import LeaveRow from "./LeaveRow";
import DirectorActionModal from "./DirectorActionModal";
import { updateLeave } from "../services/leave.service";

interface Props {
    leaves: LeaveRequest[];
    reload: () => void;
    isDirecteur: boolean;
}

export default function LeaveTable({ leaves, reload, isDirecteur }: Props) {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    
    // Modal state for director approve / reject actions
    const [modalState, setModalState] = useState<{
        leave: LeaveRequest | null;
        action: "approved" | "rejected" | null;
    }>({ leave: null, action: null });

    const handleActionOpen = (leave: LeaveRequest, action: "approved" | "rejected") => {
        setModalState({ leave, action });
    };

    const handleConfirmAction = async (comment: string) => {
        if (!modalState.leave || !modalState.action) return;
        await updateLeave(modalState.leave.id, {
            status: modalState.action,
            comment: comment.trim() || undefined,
        });
        reload();
    };

    const filteredLeaves = leaves.filter((leave) => {
        const matchesStatus =
            statusFilter === "all" || leave.status === statusFilter;
        
        const fullName = `${leave.user?.first_name || ''} ${leave.user?.last_name || ''}`.toLowerCase();
        const reason = (leave.reason || '').toLowerCase();
        const query = searchQuery.toLowerCase();

        const matchesSearch = !query || fullName.includes(query) || reason.includes(query);

        return matchesStatus && matchesSearch;
    });

    return (
        <div className="leave-table-card">
            {/* Toolbar */}
            <div className="leave-table-toolbar">
                <div className="leave-filter-tabs">
                    <button
                        className={`leave-tab-btn ${statusFilter === "all" ? "active" : ""}`}
                        onClick={() => setStatusFilter("all")}
                    >
                        Toutes ({leaves.length})
                    </button>
                    <button
                        className={`leave-tab-btn ${statusFilter === "pending" ? "active" : ""}`}
                        onClick={() => setStatusFilter("pending")}
                    >
                        En attente ({leaves.filter(l => l.status === "pending").length})
                    </button>
                    <button
                        className={`leave-tab-btn ${statusFilter === "approved" ? "active" : ""}`}
                        onClick={() => setStatusFilter("approved")}
                    >
                        Approuvées ({leaves.filter(l => l.status === "approved").length})
                    </button>
                    <button
                        className={`leave-tab-btn ${statusFilter === "rejected" ? "active" : ""}`}
                        onClick={() => setStatusFilter("rejected")}
                    >
                        Refusées ({leaves.filter(l => l.status === "rejected").length})
                    </button>
                </div>

                <div className="leave-search-input-wrap">
                    <span className="leave-search-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="leave-search-input"
                        placeholder="Rechercher par employé, motif..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table className="leave-custom-table">
                    <thead>
                        <tr>
                            <th>Employé</th>
                            <th>Type & Période</th>
                            <th>Motif</th>
                            <th>Justificatif</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length > 0 ? (
                            filteredLeaves.map((leave) => (
                                <LeaveRow
                                    key={leave.id}
                                    leave={leave}
                                    isDirecteur={isDirecteur}
                                    onAction={handleActionOpen}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                                    Aucune demande de congé ne correspond aux critères.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Director Action Modal */}
            <DirectorActionModal
                action={modalState.action}
                leave={modalState.leave}
                onClose={() => setModalState({ leave: null, action: null })}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
}