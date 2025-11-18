import { render, screen } from "@testing-library/react";

import Header from "@/components/Header";

describe("Header Component", () => {
    it("renders the logo with correct text", () => {
        render(<Header />);
        const logo = screen.getByText("Michael Fransman");
        expect(logo).toBeInTheDocument();
    });

    it("renders the logo as a link to home", () => {
        render(<Header />);
        const logo = screen.getByText("Michael Fransman");
        expect(logo.closest("a")).toHaveAttribute("href", "/");
    });

    it("renders all navigation links", () => {
        render(<Header />);

        const portfolioLink = screen.getByText("Portfolio");
        const aboutLink = screen.getByText("About");
        const adminLink = screen.getByText("Admin");

        expect(portfolioLink).toBeInTheDocument();
        expect(aboutLink).toBeInTheDocument();
        expect(adminLink).toBeInTheDocument();
    });

    it("navigation links have correct hrefs", () => {
        render(<Header />);

        const portfolioLink = screen.getByText("Portfolio");
        const aboutLink = screen.getByText("About");
        const adminLink = screen.getByText("Admin");

        expect(portfolioLink.closest("a")).toHaveAttribute("href", "/");
        expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
        expect(adminLink.closest("a")).toHaveAttribute("href", "/admin");
    });
});
