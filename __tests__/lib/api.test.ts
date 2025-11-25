import {
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
} from "@/lib/api";
import { Project } from "@/types/project";

global.fetch = jest.fn();

describe("API Functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchProjects", () => {
        it("should fetch projects successfully", async () => {
            const mockProjects: Project[] = [
                { id: "1", title: "Test", description: "Test desc" },
            ];

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockProjects,
            });

            const result = await fetchProjects();

            expect(result).toEqual(mockProjects);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/projects"),
                expect.objectContaining({ next: { revalidate: 10 } })
            );
        });

        it("should throw error on failed fetch", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

            await expect(fetchProjects()).rejects.toThrow(
                "Failed to fetch projects: 500"
            );
        });
    });

    describe("createProject", () => {
        it("should create project successfully", async () => {
            const newProject: Omit<Project, "id"> = {
                title: "New",
                description: "New desc",
            };
            const createdProject: Project = { id: "1", ...newProject };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => createdProject,
            });

            const result = await createProject(newProject);

            expect(result).toEqual(createdProject);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/projects"),
                expect.objectContaining({
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newProject),
                })
            );
        });

        it("should throw error on failed create", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 400,
            });

            await expect(
                createProject({ title: "Test", description: "Test" })
            ).rejects.toThrow("Failed to create project: 400");
        });
    });

    describe("updateProject", () => {
        it("should update project successfully", async () => {
            const updates: Omit<Project, "id"> = {
                title: "Updated",
                description: "Updated desc",
            };
            const updatedProject: Project = { id: "1", ...updates };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => updatedProject,
            });

            const result = await updateProject("1", updates);

            expect(result).toEqual(updatedProject);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/projects/1"),
                expect.objectContaining({
                    method: "PUT",
                })
            );
        });
    });

    describe("deleteProject", () => {
        it("should delete project successfully", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
            });

            await expect(deleteProject("1")).resolves.toBeUndefined();

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/projects/1"),
                expect.objectContaining({
                    method: "DELETE",
                })
            );
        });

        it("should throw error on failed delete", async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            await expect(deleteProject("1")).rejects.toThrow(
                "Failed to delete project: 404"
            );
        });
    });
});
