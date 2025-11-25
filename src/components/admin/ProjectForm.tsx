"use client";

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Project } from "@/types/project";

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

const ErrorMessage = styled.div`
    background: #fee;
    color: #c00;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.95rem;
`;

export interface ProjectFormProps {
    formData: Omit<Project, "id">;
    editingId: string | null;
    error: string | null;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (data: Omit<Project, "id">) => void;
    onCancel: () => void;
}

export default function ProjectForm({
    formData,
    editingId,
    error,
    onSubmit,
    onChange,
    onCancel,
}: ProjectFormProps) {
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingId) {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                titleInputRef.current?.focus();
            }, 100);
        }
    }, [editingId]);

    return (
        <FormCard>
            <FormTitle>
                {editingId ? "Edit Project" : "Create New Project"}
            </FormTitle>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form onSubmit={onSubmit}>
                <Row>
                    <Input
                        ref={titleInputRef}
                        placeholder="Project Title"
                        value={formData.title}
                        onChange={(e) =>
                            onChange({ ...formData, title: e.target.value })
                        }
                        required
                    />
                    <Input
                        placeholder="Image URL (optional)"
                        value={formData.image || ""}
                        onChange={(e) =>
                            onChange({ ...formData, image: e.target.value })
                        }
                    />
                </Row>
                <Row>
                    <Input
                        placeholder="Project Link (optional)"
                        value={formData.link || ""}
                        onChange={(e) =>
                            onChange({ ...formData, link: e.target.value })
                        }
                        type="url"
                    />
                </Row>
                <Row>
                    <TextArea
                        placeholder="Project Description"
                        value={formData.description}
                        onChange={(e) =>
                            onChange({
                                ...formData,
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
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                </ButtonGroup>
            </form>
        </FormCard>
    );
}
