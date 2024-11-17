import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
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

    expect(console.log).toHaveBeenCalledWith({
      first: "John",
      last: "Doe",
      email: "john.doe@example.com",
      password: "Password123",
    });
  });
});
