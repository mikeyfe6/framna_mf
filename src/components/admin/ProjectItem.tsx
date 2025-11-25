"use client";

import styled from "styled-components";
import { Project } from "@/types/project";

const ProjectCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
`;

const ProjectInfo = styled.div`
    flex: 1;
`;

const ProjectTitle = styled.strong`
    font-size: 1.1rem;
    color: #333;
    display: block;
    margin-bottom: 0.5rem;
`;

const ProjectDesc = styled.div`
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
`;

const ProjectActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" | "danger" }>`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    ${(props) =>
        props.$variant === "primary"
            ? `
        background: #fc0;
        color: #333;
        
        &:hover {
            background: #e6b800;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(255, 204, 0, 0.3);
        }
    `
            : props.$variant === "danger"
            ? `
        background: #ff4444;
        color: white;
        
        &:hover {
            background: #cc0000;
            transform: translateY(-1px);
        }
    `
            : `
        background: #e0e0e0;
        color: #333;
        
        &:hover {
            background: #d0d0d0;
        }
    `}
`;

export interface ProjectItemProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

export default function ProjectItem({
    project,
    onEdit,
    onDelete,
}: ProjectItemProps) {
    const handleDelete = () => {
        if (!project.id) return;
        if (!confirm(`Delete "${project.title}"?`)) return;
        onDelete(project.id);
    };

    return (
        <ProjectCard>
            <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDesc>{project.description}</ProjectDesc>
            </ProjectInfo>
            <ProjectActions>
                <Button onClick={() => onEdit(project)} $variant="secondary">
                    Edit
                </Button>
                <Button onClick={handleDelete} $variant="danger">
                    Delete
                </Button>
            </ProjectActions>
        </ProjectCard>
    );
}
