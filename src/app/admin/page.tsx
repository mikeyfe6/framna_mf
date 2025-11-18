"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Project } from "@/types/project";
import { projectsUrl } from "@/lib/api";

const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #333;
`;

const FormCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 3rem;
`;

const FormTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
`;

const Row = styled.div`
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Input = styled.input`
    padding: 0.75rem;
    flex: 1;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
    font-size: 1rem;
    transition: border-color 0.2s;
    color: #333;
    width: 100%;

    &:focus {
        outline: none;
        border-color: #fc0;
    }
`;

const TextArea = styled.textarea`
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    background: #fafafa;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
    resize: vertical;
    color: #333;
    width: 100%;

    &:focus {
        outline: none;
        border-color: #fc0;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
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

const SectionTitle = styled.h2`
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #333;
`;

const ProjectList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

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

export default function AdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<Project>({
        title: "",
        description: "",
        image: "",
        link: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const titleInputRef = React.useRef<HTMLInputElement>(null);

    async function load() {
        setLoading(true);
        const res = await fetch(projectsUrl);
        const data = await res.json();
        setProjects(data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreateOrUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (editingId) {
            await fetch(`${projectsUrl}/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setEditingId(null);
        } else {
            await fetch(projectsUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
        }
        setForm({ title: "", description: "", image: "", link: "" });
        await load();
    }

    async function handleDelete(id?: string) {
        if (!id) return;
        if (!confirm("Delete this project?")) return;
        await fetch(`${projectsUrl}/${id}`, { method: "DELETE" });
        await load();
    }

    function startEdit(p: Project) {
        setEditingId(p.id || null);
        setForm({
            title: p.title,
            description: p.description,
            image: p.image,
            link: p.link,
        });

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            titleInputRef.current?.focus();
        }, 100);
    }

    return (
        <Container>
            <Title>Admin Panel</Title>

            <FormCard>
                <FormTitle>
                    {editingId ? "Edit Project" : "Create New Project"}
                </FormTitle>
                <form onSubmit={handleCreateOrUpdate}>
                    <Row>
                        <Input
                            ref={titleInputRef}
                            placeholder="Project Title"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                            required
                        />
                        <Input
                            placeholder="Image URL (optional)"
                            value={form.image}
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.value })
                            }
                        />
                    </Row>
                    <Row>
                        <Input
                            placeholder="Project Link (optional)"
                            value={form.link}
                            onChange={(e) =>
                                setForm({ ...form, link: e.target.value })
                            }
                            type="url"
                        />
                    </Row>
                    <Row>
                        <TextArea
                            placeholder="Project Description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            rows={4}
                            required
                        />
                    </Row>
                    <ButtonGroup>
                        <Button type="submit" $variant="primary">
                            {editingId ? "Save Changes" : "Create Project"}
                        </Button>
                        {editingId && (
                            <Button
                                type="button"
                                $variant="secondary"
                                onClick={() => {
                                    setEditingId(null);
                                    setForm({
                                        title: "",
                                        description: "",
                                        image: "",
                                        link: "",
                                    });
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </ButtonGroup>
                </form>
            </FormCard>

            <SectionTitle>All Projects ({projects.length})</SectionTitle>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <ProjectList>
                    {projects.map((p) => (
                        <ProjectCard key={p.id}>
                            <ProjectInfo>
                                <ProjectTitle>{p.title}</ProjectTitle>
                                <ProjectDesc>{p.description}</ProjectDesc>
                            </ProjectInfo>
                            <ProjectActions>
                                <Button
                                    onClick={() => startEdit(p)}
                                    $variant="secondary"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => handleDelete(p.id)}
                                    $variant="danger"
                                >
                                    Delete
                                </Button>
                            </ProjectActions>
                        </ProjectCard>
                    ))}
                </ProjectList>
            )}
        </Container>
    );
}
