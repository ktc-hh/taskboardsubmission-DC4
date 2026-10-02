import { useState } from "react";
import LoginForm from "./LoginForm";
import ProjectList from "./ProjectList";
import LogoutButton from "./LogoutButton";
import "./App.css";

export default function App() {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    function handleLogin() {
        setToken(localStorage.getItem("token"));
    }

    function handleLogout() {
        setToken(null);
    }

    if (!token) {
        return (
            <LoginForm onLogin={handleLogin} />
        );
    }

    return (
        <div>
            <header>
                <h1>TaskBoard</h1>

                <LogoutButton
                    onLogout={handleLogout}
                />
            </header>

            <ProjectList />
        </div>
    );
}