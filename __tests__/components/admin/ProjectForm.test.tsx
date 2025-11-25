import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectForm from "@/components/admin/ProjectForm";

describe("ProjectForm", () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    const mockOnChange = jest.fn();
    const mockOnCancel = jest.fn();

    const defaultProps = {
        formData: { title: "", description: "", image: "", link: "" },
        editingId: null,
        error: null,
        onSubmit: mockOnSubmit,
        onChange: mockOnChange,
        onCancel: mockOnCancel,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render create mode by default", () => {
        render(<ProjectForm {...defaultProps} />);
        expect(screen.getByText("Create New Project")).toBeInTheDocument();
    });

    it("should render edit mode when editingId is provided", () => {
        render(<ProjectForm {...defaultProps} editingId="123" />);
        expect(screen.getByText("Edit Project")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("should display error message when error is provided", () => {
        render(<ProjectForm {...defaultProps} error="Something went wrong" />);
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("should call onChange when typing in title input", async () => {
        const user = userEvent.setup();
        render(<ProjectForm {...defaultProps} />);

        const titleInput = screen.getByPlaceholderText("Project Title");
        await user.type(titleInput, "Test");

        expect(mockOnChange).toHaveBeenCalled();
    });

    it("should call onSubmit when form is submitted", async () => {
        render(
            <ProjectForm
                {...defaultProps}
                formData={{
                    title: "Test Project",
                    description: "Test Description",
                    image: "",
                    link: "",
                }}
            />
        );

        const submitButton = screen.getByText("Create Project");
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("should call onCancel when cancel button is clicked in edit mode", () => {
        render(<ProjectForm {...defaultProps} editingId="123" />);

        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalled();
    });
});
