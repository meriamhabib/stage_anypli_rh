import { useEffect, useState } from "react";
import AppLayout from "../../../components/layout/AppLayout";
import { getEmployees } from "../employee.service";
import EmployeeList from "../components/EmployeeList";
import AddEmployee from "../components/AddEmployee";
import "../Employees.css";

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    position?: string;
    hire_date?: string;
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error("Error loading employees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    return (
        <AppLayout>
            <div className="employees-page">
                <section className="employees-hero">
                    <div className="employees-hero-content">
                        <span className="employees-badge">👥 Gestion des Employés</span>
                        <h1 className="employees-title">Liste des Employés</h1>
                        <p className="employees-subtitle">
                            Consultez, ajoutez et gérez les employés de l'entreprise Anypli.
                        </p>
                    </div>
                    <button
                        className="employees-primary-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        {showForm ? "Fermer le formulaire" : "Ajouter un employé"}
                    </button>
                </section>

                <div className="employees-content">
                    {showForm && (
                        <div className="employees-form-card">
                            <h2>Ajouter un employé</h2>
                            <p>Remplissez les informations du nouvel employé.</p>
                            <AddEmployee
                                onSuccess={() => {
                                    setShowForm(false);
                                    loadEmployees();
                                }}
                            />
                        </div>
                    )}

                    <div className="employees-list-card">
                        <h2>Employés disponibles</h2>
                        <p>Consultez la liste complète des employés de l'entreprise.</p>
                        {loading ? (
                            <div className="employees-empty">
                                <strong>Chargement des employés...</strong>
                            </div>
                        ) : (
                            <EmployeeList employees={employees} />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
