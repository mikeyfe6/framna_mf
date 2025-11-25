"use client";

import styled from "styled-components";
import { Project } from "@/types/project";
import ProjectItem from "./ProjectItem";

const Title = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #333;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LoadingMessage = styled.p`
    text-align: center;
    color: #999;
    font-size: 1.1rem;
    padding: 2rem 0;
`;

const EmptyState = styled.p`
    text-align: center;
    color: #999;
    font-size: 1.1rem;
    padding: 2rem 0;
`;

export interface ProjectListProps {
    projects: Project[];
    loading: boolean;
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

export default function ProjectList({
    projects,
    loading,
    onEdit,
    onDelete,
}: ProjectListProps) {
    return (
        <>
            <Title>All Projects ({projects.length})</Title>
            {loading ? (
                <LoadingMessage>Loading projects...</LoadingMessage>
            ) : projects.length === 0 ? (
                <EmptyState>
                    No projects yet. Create your first one above!
                </EmptyState>
            ) : (
                <List>
                    {projects.map((p) => (
                        <ProjectItem
                            key={p.id}
                            project={p}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </List>
            )}
        </>
    );
}
