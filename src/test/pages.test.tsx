import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Login Page", () => {
  it("renders the login form", () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/AI School - Login/)).toBeInTheDocument();
  });

  it("has email input", () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  it("has password input", () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it("has sign in button", () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole("button", { name: /Sign In/ })).toBeInTheDocument();
  });
});
