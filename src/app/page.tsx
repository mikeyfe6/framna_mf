import { fetchProjects } from "@/lib/api";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Project } from "@/types/project";

export const revalidate = 10;

export default async function Home() {
    let projects: Project[] = [];

    try {
        projects = await fetchProjects();
    } catch (error) {
        console.error("Failed to load projects:", error);
    }

    return (
        <>
            <Hero />
            <ProjectsGrid projects={projects} />
        </>
    );
}
