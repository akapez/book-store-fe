import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./sign-up-form";

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  (console.log as jest.Mock).mockRestore();
});

describe("SignUpForm", () => {
  it("renders the sign-up form", () => {
    render(<SignUpForm />);
    expect(
      screen.getByRole("heading", { name: /sign up/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("shows validation messages on invalid sign up form submission", async () => {
    const formEvent = userEvent.setup();
    render(<SignUpForm />);

    // Try to submit the form without filling in any fields
    await formEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText("First name must be at least three characters.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Last name must be at least three characters.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Invalid email address.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument();

    // Fill in invalid email and short password
    await formEvent.type(screen.getByPlaceholderText("Email"), "invalid-email");
    await formEvent.type(screen.getByPlaceholderText("Password"), "short");
    await formEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(
      screen.getByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument();

    // Check for the password uppercase validation message that is displayed
    await formEvent.clear(screen.getByPlaceholderText("Password"));
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "lowercasepassword"
    );
    await formEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(
      screen.getByText("Password must contain at least one uppercase letter.")
    ).toBeInTheDocument();

    // Check for the password lowercase validation message that is displayed
    await formEvent.clear(screen.getByPlaceholderText("Password"));
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "UPPERCASEPASSWORD"
    );
    await formEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(
      screen.getByText("Password must contain at least one lowercase letter.")
    ).toBeInTheDocument();

    // Check for the password numeric validation message that is displayed
    await formEvent.clear(screen.getByPlaceholderText("Password"));
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "LongPassword"
    );
    await formEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(
      screen.getByText("Password must contain at least one numeric character.")
    ).toBeInTheDocument();
  });

  it("submits the sign up form with correct data", async () => {
    const formEvent = userEvent.setup();
    render(<SignUpForm />);

    await formEvent.type(screen.getByPlaceholderText("First Name"), "John");
    await formEvent.type(screen.getByPlaceholderText("Last Name"), "Doe");
    await formEvent.type(
      screen.getByPlaceholderText("Email"),
      "john.doe@example.com"
    );

    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "Password123"
    );
    await formEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Check that all validations have been passed
    await waitFor(() =>
      expect(
        screen.queryByText("First name must be at least three characters.")
      ).not.toBeInTheDocument()
    );
    expect(
      screen.queryByText("Last name must be at least three characters.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Invalid email address.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password must be at least 8 characters long.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password must contain at least one uppercase letter.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password must contain at least one lowercase letter.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Password must contain at least one numeric character."
      )
    ).not.toBeInTheDocument();

    expect(console.log).toHaveBeenCalledWith({
      first: "John",
      last: "Doe",
      email: "john.doe@example.com",
      password: "Password123",
    });
  });
});
