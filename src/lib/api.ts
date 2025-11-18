const BASE = process.env.NEXT_PUBLIC_API_URL || "YOUR_API_URL";

export const projectsUrl = `${BASE}/projects`;

export async function fetchProjects() {
    const res = await fetch(projectsUrl, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
}
