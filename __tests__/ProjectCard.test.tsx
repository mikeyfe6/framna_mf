import { render, screen } from "@testing-library/react";

import ProjectCard from "@/components/ProjectCard";

test("renders project card", () => {
    const p = { title: "Test Project", description: "Test description" };
    render(<ProjectCard project={p} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
});
