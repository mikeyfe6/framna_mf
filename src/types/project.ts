export interface Project {
    id?: string;
    title: string;
    description: string;
    image?: string;
    link?: string;
}

export interface ProjectFormData extends Omit<Project, "id"> {}

export interface APIError {
    message: string;
    status?: number;
}
