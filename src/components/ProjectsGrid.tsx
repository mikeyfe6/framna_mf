"use client";

import styled from "styled-components";
import { Project } from "@/types/project";

const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #333;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
`;

const Card = styled.article`
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background: white;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
    }

    p {
        color: #666;
    }
`;

const ProjectImage = styled.img`
    width: 100%;
    border-radius: 6px;
    margin-bottom: 1rem;
`;

const EmptyState = styled.p`
    text-align: center;
    color: #999;
    font-size: 1.1rem;
    padding: 3rem 0;
`;

export interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (!projects || projects.length === 0) {
        return (
            <Container>
                <SectionTitle>Check out my recent projects:</SectionTitle>
                <EmptyState>No projects available yet.</EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <SectionTitle>Check out my recent projects:</SectionTitle>
            <Grid>
                {projects.map((p) =>
                    p.link ? (
                        <a
                            key={p.id}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Card>
                                {p.image && (
                                    <ProjectImage src={p.image} alt={p.title} />
                                )}
                                <h3>{p.title}</h3>
                                <p>{p.description}</p>
                            </Card>
                        </a>
                    ) : (
                        <Card key={p.id}>
                            {p.image && (
                                <ProjectImage src={p.image} alt={p.title} />
                            )}
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </Card>
                    )
                )}
            </Grid>
        </Container>
    );
}
