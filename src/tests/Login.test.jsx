import {App} from "../pages/Login";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("should render the login form", () => {
    render(<App />);
    expect(screen.getByText(/User Management System/i)).toBeInTheDocument();
  });
});
