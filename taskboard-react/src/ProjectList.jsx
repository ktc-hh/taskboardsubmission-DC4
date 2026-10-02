import { useEffect, useState } from "react";
import { api } from "./api";
import AddProjectForm from "./AddProjectForm";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    async function loadProjects() {
        try {
            const data = await api("/projects");

            setProjects(data.data || []);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadProjects();
    }, []);

    function addProject(project) {
        setProjects((current) => [
            project,
            ...current,
        ]);
    }

    return (
        <div className="container">
            <h2>My Projects</h2>

            <AddProjectForm onProjectAdded={addProject} />

            {error && (
                <p className="error">{error}</p>
            )}

            <div className="projects">
                {projects.length === 0 ? (
                    <p>No projects yet.</p>
                ) : (
                    projects.map((project) => (
                        <div
                            className="project"
                            key={project.id}
                        >
                            <h3>{project.name}</h3>

                            <p>
                                {project.description ||
                                    "No description"}
                            </p>

                            <strong>
                                Tasks:{" "}
                                {project.tasks_count ?? 0}
                            </strong>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
