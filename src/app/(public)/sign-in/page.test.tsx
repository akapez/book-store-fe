import "@testing-library/jest-dom";

import { useToast } from "@hooks/useToast";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

import SignInForm from "./components/SignInForm";

jest.mock("next-auth/react");
jest.mock("@hooks/useToast");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe("SignInForm", () => {
  const toastMock = jest.fn();
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: toastMock });
  });

  it("renders the sign-in form correctly", () => {
    render(<SignInForm />);

    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
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

  it("submits the form with valid data", async () => {
    const formEvent = userEvent.setup();
    (signIn as jest.Mock).mockResolvedValue({ ok: true });

    render(<SignInForm />);

    await formEvent.type(screen.getByLabelText(/email/i), "sam@example.com");
    await formEvent.type(screen.getByLabelText(/password/i), "Password123");

    await formEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "sam@example.com",
      password: "Password123",
      redirect: false,
    });

    await waitFor(() =>
      expect(
        screen.queryByText("Invalid email address.")
      ).not.toBeInTheDocument()
    );
    expect(screen.queryByText("Password is required.")).not.toBeInTheDocument();

    expect(toastMock).toHaveBeenCalledWith({
      title: "Successfully signed in.",
    });
  });

  it("shows an error message on failed sign-in", async () => {
    const formEvent = userEvent.setup();
    (signIn as jest.Mock).mockResolvedValue({
      ok: false,
      error: "Invalid credentials",
    });

    render(<SignInForm />);

    await formEvent.type(screen.getByLabelText(/email/i), "sam@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password");

    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "sam@example.com",
      password: "password",
      redirect: false,
    });

    expect(toastMock).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Invalid credentials",
      description: "There was a problem with your request.",
    });
  });
});
