import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
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

    expect(console.log).toHaveBeenCalledWith({
      email: "john.doe@example.com",
      password: "Password123",
    });
  });
});
