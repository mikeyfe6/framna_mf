import { Project } from "@/types/project";

const BASE = process.env.NEXT_PUBLIC_API_URL || "YOUR_API_URL";
export const projectsUrl = `${BASE}/projects`;

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(projectsUrl, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
    return res.json();
}

export async function createProject(
    data: Omit<Project, "id">
): Promise<Project> {
    const res = await fetch(projectsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to create project: ${res.status}`);
    return res.json();
}

export async function updateProject(
    id: string,
    data: Omit<Project, "id">
): Promise<Project> {
    const res = await fetch(`${projectsUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update project: ${res.status}`);
    return res.json();
}

export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`${projectsUrl}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete project: ${res.status}`);
}
