"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
} from "@/lib/api";

export interface UseAdminProps {
    projects: Project[];
    loading: boolean;
    error: string | null;
    formData: Omit<Project, "id">;
    editingId: string | null;
    setFormData: (data: Omit<Project, "id">) => void;
    handleCreate: () => Promise<void>;
    handleUpdate: (id: string) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    startEdit: (project: Project) => void;
    cancelEdit: () => void;
    refreshProjects: () => Promise<void>;
}

export function useAdmin(): UseAdminProps {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Project, "id">>({
        title: "",
        description: "",
        image: "",
        link: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const refreshProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProjects();
            setProjects(data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load projects"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProjects();
    }, []);

    const handleCreate = async () => {
        setError(null);
        try {
            await createProject(formData);
            setFormData({ title: "", description: "", image: "", link: "" });
            await refreshProjects();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to create project"
            );
            throw err;
        }
    };

    const handleUpdate = async (id: string) => {
        setError(null);
        try {
            await updateProject(id, formData);
            setEditingId(null);
            setFormData({ title: "", description: "", image: "", link: "" });
            await refreshProjects();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to update project"
            );
            throw err;
        }
    };

    const handleDelete = async (id: string) => {
        setError(null);
        try {
            await deleteProject(id);
            await refreshProjects();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete project"
            );
            throw err;
        }
    };

    const startEdit = (project: Project) => {
        setEditingId(project.id || null);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            link: project.link,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ title: "", description: "", image: "", link: "" });
    };

    return {
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
        refreshProjects,
    };
}
