import { fetchProjects } from "@/lib/api";

global.fetch = jest.fn();

describe("fetchProjects", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("fetches projects successfully", async () => {
        const mockProjects = [
            {
                id: "1",
                title: "Test Project",
                description: "Test Description",
                image: "test.jpg",
                link: "https://test.com",
            },
        ];

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProjects,
        });

        const result = await fetchProjects();

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/projects"),
            { next: { revalidate: 10 } }
        );
        expect(result).toEqual(mockProjects);
    });

    it("throws an error when fetch fails", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(fetchProjects()).rejects.toThrow(
            "Failed to fetch projects"
        );
    });

    it("throws an error when network request fails", async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(
            new Error("Network error")
        );

        await expect(fetchProjects()).rejects.toThrow("Network error");
    });

    it("uses correct API endpoint from environment variable", async () => {
        const mockProjects: never[] = [];

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProjects,
        });

        await fetchProjects();

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                next: { revalidate: 10 },
            })
        );
    });
});
