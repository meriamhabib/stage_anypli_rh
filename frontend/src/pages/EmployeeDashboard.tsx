import { Link } from "react-router-dom";

export default function EmployeeDashboard(){

    return (

        <div>

            <h1>
                Espace Employé
            </h1>

            <p>
                Bienvenue dans votre espace employé
            </p>

            <Link to="/tasks">
                Mes tâches
            </Link>

        </div>

    );

}