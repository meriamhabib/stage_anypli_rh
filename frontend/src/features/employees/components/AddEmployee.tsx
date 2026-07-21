import { useState } from "react";
import { createEmployee } from "../employee.service";

interface AddEmployeeProps {
    onSuccess: () => void;
}

function AddEmployee({ onSuccess }: AddEmployeeProps) {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        position: "",
        hire_date: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEmployee(form);
            setForm({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                position: "",
                hire_date: ""
            });
            onSuccess();
        } catch (error: any) {
            console.log(error.response?.data);
            alert("Erreur lors de l'ajout");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="employees-form">
            <div className="employees-form-grid">
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text-h)' }}>Prénom</label>
                    <input
                        name="first_name"
                        placeholder="Prénom"
                        value={form.first_name}
                        onChange={handleChange}
                        className="employees-input"
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text-h)' }}>Nom</label>
                    <input
                        name="last_name"
                        placeholder="Nom"
                        value={form.last_name}
                        onChange={handleChange}
                        className="employees-input"
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text-h)' }}>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email@anypli.tn"
                        value={form.email}
                        onChange={handleChange}
                        className="employees-input"
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text-h)' }}>Téléphone</label>
                    <input
                        name="phone"
                        placeholder="+216 xx xxx xxx"
                        value={form.phone}
                        onChange={handleChange}
                        className="employees-input"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text-h)' }}>Poste</label>
                    <input
                        name="position"
                        placeholder="Poste"
                        value={form.position}
                        onChange={handleChange}
                        className="employees-input"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--text-h)' }}>Date d'embauche</label>
                    <input
                        name="hire_date"
                        type="date"
                        value={form.hire_date}
                        onChange={handleChange}
                        className="employees-input"
                    />
                </div>
            </div>
            <div className="employees-actions">
                <button type="submit" className="employees-button">
                    Ajouter
                </button>
            </div>
        </form>
    );
}

export default AddEmployee;