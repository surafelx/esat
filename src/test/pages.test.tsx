import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Onboarding from "../pages/Onboarding";
import Assignments from "../pages/Assignments";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Index Page", () => {
  it("renders the hero headline", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText(/Learn AI Engineering/)).toBeInTheDocument();
  });

  it("renders the CTA buttons", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText(/Start Learning Free/)).toBeInTheDocument();
    expect(screen.getByText(/View Roadmap/)).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText(/Students/)).toBeInTheDocument();
    expect(screen.getByText(/Projects/)).toBeInTheDocument();
    expect(screen.getByText(/Success Rate/)).toBeInTheDocument();
  });

  it("renders the features section", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText(/AI-Powered Tutoring/)).toBeInTheDocument();
    expect(screen.getByText(/Structured Roadmaps/)).toBeInTheDocument();
    expect(screen.getByText(/Community Support/)).toBeInTheDocument();
  });
});

describe("Onboarding Page", () => {
  it("renders the welcome step", () => {
    renderWithRouter(<Onboarding />);
    expect(screen.getByText(/Welcome to AI School/)).toBeInTheDocument();
  });

  it("has a Get Started button", () => {
    renderWithRouter(<Onboarding />);
    expect(screen.getByText(/Get Started/)).toBeInTheDocument();
  });

  it("shows the progress bar with 4 steps", () => {
    renderWithRouter(<Onboarding />);
    const progressSteps = document.querySelectorAll(".rounded-full");
    expect(progressSteps).toHaveLength(4);
  });
});

describe("Assignments Page", () => {
  it("renders the page title", () => {
    renderWithRouter(<Assignments />);
    expect(screen.getByText(/Assignments/)).toBeInTheDocument();
  });

  it("shows coming soon message", () => {
    renderWithRouter(<Assignments />);
    expect(screen.getByText(/Coming Soon/)).toBeInTheDocument();
  });

  it("displays courses from JSON data", () => {
    renderWithRouter(<Assignments />);
    expect(screen.getByText(/AI Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/Data Science/)).toBeInTheDocument();
  });

  it("shows upcoming assignments section", () => {
    renderWithRouter(<Assignments />);
    expect(screen.getByText(/Upcoming Assignments/)).toBeInTheDocument();
  });
});
