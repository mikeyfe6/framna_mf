import { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
        </article>
    );
}
