import { useState } from "react";
import { api } from "./api";

export default function AddProjectForm({
    onProjectAdded,
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const data = await api("/projects", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            onProjectAdded(data.data);

            setName("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Project</h3>

            <input
                type="text"
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <button type="submit">
                Add Project
            </button>

            {error && (
                <p className="error">{error}</p>
            )}
        </form>
    );
}