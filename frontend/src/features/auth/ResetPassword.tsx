import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/reset-password",
                {
                    token,
                    password,
                    password_confirmation: passwordConfirmation,
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error: any) {

            setMessage(
                error.response?.data?.message || "An error occurred."
            );
        }
    };

    return (

        <div style={{ width: "400px", margin: "100px auto" }}>

            <h2>Create your password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(e) =>
                        setPasswordConfirmation(e.target.value)
                    }
                />

                <br /><br />

                <button type="submit">

                    Save password

                </button>

            </form>

            <p>{message}</p>

        </div>

    );
}