import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../auth.service";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const response = await forgotPassword(email);

            setMessage(response.data.message);

            setEmail("");

        } catch (err: any) {

            setError(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            style={{
                width: "400px",
                margin: "100px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
        >

            <h2 style={{ textAlign: "center" }}>
                Forgot Password
            </h2>

            <p style={{ textAlign: "center", color: "#666" }}>
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#0d6efd",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >

                    {loading ? "Sending..." : "Send Reset Link"}

                </button>

            </form>

            {message && (

                <p
                    style={{
                        color: "green",
                        marginTop: "20px",
                        textAlign: "center"
                    }}
                >
                    {message}
                </p>

            )}

            {error && (

                <p
                    style={{
                        color: "red",
                        marginTop: "20px",
                        textAlign: "center"
                    }}
                >
                    {error}
                </p>

            )}

            <div
                style={{
                    marginTop: "25px",
                    textAlign: "center"
                }}
            >

                <Link
                    to="/login"
                    style={{
                        textDecoration: "none",
                        color: "#0d6efd"
                    }}
                >
                    ← Back to Login
                </Link>

            </div>

        </div>

    );

}