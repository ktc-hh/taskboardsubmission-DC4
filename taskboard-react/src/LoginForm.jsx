import { useState } from "react";
import { api } from "./api";

export default function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const data = await api("/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            localStorage.setItem("token", data.token);

            onLogin();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">
            <h1>TaskBoard</h1>

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}