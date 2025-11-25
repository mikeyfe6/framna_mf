import { render, screen } from "@testing-library/react";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Project } from "@/types/project";

describe("ProjectsGrid", () => {
    it("should render empty state when no projects", () => {
        render(<ProjectsGrid projects={[]} />);
        expect(screen.getByText(/no projects available/i)).toBeInTheDocument();
    });

    it("should render projects list", () => {
        const projects: Project[] = [
            { id: "1", title: "Project 1", description: "Desc 1" },
            { id: "2", title: "Project 2", description: "Desc 2" },
        ];

        render(<ProjectsGrid projects={projects} />);

        expect(screen.getByText("Project 1")).toBeInTheDocument();
        expect(screen.getByText("Project 2")).toBeInTheDocument();
        expect(screen.getByText("Desc 1")).toBeInTheDocument();
    });

    it("should render clickable link when project has link", () => {
        const projects: Project[] = [
            {
                id: "1",
                title: "Linked Project",
                description: "With link",
                link: "https://example.com",
            },
        ];

        render(<ProjectsGrid projects={projects} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("should render image when provided", () => {
        const projects: Project[] = [
            {
                id: "1",
                title: "With Image",
                description: "Has image",
                image: "https://example.com/image.jpg",
            },
        ];

        render(<ProjectsGrid projects={projects} />);

        const img = screen.getByAltText("With Image");
        expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    });
});
