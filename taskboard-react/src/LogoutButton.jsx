import { api } from "./api";

export default function LogoutButton({ onLogout }) {
    async function handleLogout() {
        try {
            await api("/logout", {
                method: "POST",
            });
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("token");
            onLogout();
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}