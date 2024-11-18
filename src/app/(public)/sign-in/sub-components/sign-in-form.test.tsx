import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInForm from "./sign-in-form";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  (console.log as jest.Mock).mockRestore();
});

describe("SignInForm", () => {
  it("renders the form", () => {
    render(<SignInForm />);
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("shows validation messages on invalid sign in form submission", async () => {
    const formEvent = userEvent.setup();
    render(<SignInForm />);

    // Try to submit the form without filling in any fields
    await formEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(
      await screen.findByText("Invalid email address.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password is required.")
    ).toBeInTheDocument();

    // Fill in invalid email
    await formEvent.type(screen.getByPlaceholderText("Email"), "invalid-email");
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "myPassword123"
    );
    await formEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByText("Invalid email address.")).toBeInTheDocument();
  });

  it("submits the sign in form with correct data", async () => {
    const formEvent = userEvent.setup();
    render(<SignInForm />);

    await formEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "Password123"
    );

    await formEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Check that all validations have been passed
    await waitFor(() =>
      expect(
        screen.queryByText("Invalid email address.")
      ).not.toBeInTheDocument()
    );
    expect(screen.queryByText("Password is required.")).not.toBeInTheDocument();

    expect(console.log).toHaveBeenCalledWith({
      email: "john.doe@example.com",
      password: "Password123",
    });
  });
});
