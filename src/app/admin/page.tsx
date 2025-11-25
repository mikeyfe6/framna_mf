"use client";

import styled from "styled-components";
import { useAdmin } from "@/hooks/useAdmin";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";

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

export default function AdminPage() {
    const {
        projects,
        loading,
        error,
        formData,
        editingId,
        setFormData,
        handleCreate,
        handleUpdate,
        handleDelete,
        startEdit,
        cancelEdit,
    } = useAdmin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await handleUpdate(editingId);
            } else {
                await handleCreate();
            }
        } catch (error) {
            console.error("Failed to load projects:", error);
        }
    };

    return (
        <Container>
            <Title>Admin Panel</Title>

            <ProjectForm
                formData={formData}
                editingId={editingId}
                error={error}
                onSubmit={handleSubmit}
                onChange={setFormData}
                onCancel={cancelEdit}
            />

            <ProjectList
                projects={projects}
                loading={loading}
                onEdit={startEdit}
                onDelete={handleDelete}
            />
        </Container>
    );
}
