import "@testing-library/jest-dom";

import { useRouter } from "next/navigation";

import { createUser } from "@actions/user";
import { useToast } from "@hooks/useToast";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./components/SignUpForm";

jest.mock("@actions/user", () => ({
  createUser: jest.fn(),
}));
jest.mock("@hooks/useToast");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignUpForm", () => {
  const toastMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useToast as jest.Mock).mockReturnValue({ toast: toastMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign-up form correctly", () => {
    render(<SignUpForm />);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows validation messages on invalid sign up form submission", async () => {
    const formEvent = userEvent.setup();
    render(<SignUpForm />);

    // Try to submit the form without filling in any fields
    await formEvent.click(screen.getByRole("button", { name: /register/i }));

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
    await formEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(
      screen.getByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument();

    // Check for the password uppercase validation message that is displayed
    await formEvent.clear(screen.getByPlaceholderText("Password"));
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "lowercasepassword"
    );
    await formEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(
      screen.getByText("Password must contain at least one uppercase letter.")
    ).toBeInTheDocument();

    // Check for the password lowercase validation message that is displayed
    await formEvent.clear(screen.getByPlaceholderText("Password"));
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "UPPERCASEPASSWORD"
    );
    await formEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(
      screen.getByText("Password must contain at least one lowercase letter.")
    ).toBeInTheDocument();

    // Check for the password numeric validation message that is displayed
    await formEvent.clear(screen.getByPlaceholderText("Password"));
    await formEvent.type(
      screen.getByPlaceholderText("Password"),
      "LongPassword"
    );
    await formEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(
      screen.getByText("Password must contain at least one numeric character.")
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    (createUser as jest.Mock).mockResolvedValue({
      success: true,
      message: "You have successfully registered! You can now sign.",
    });

    render(<SignUpForm />);

    await userEvent.type(screen.getByLabelText(/first name/i), "Sam");
    await userEvent.type(screen.getByLabelText(/last name/i), "Smith");
    await userEvent.type(screen.getByLabelText(/email/i), "sam@gmail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "Password123");

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(createUser).toHaveBeenCalledWith(
      "sam@gmail.com",
      "Password123",
      "Sam",
      "Smith"
    );

    expect(pushMock).toHaveBeenCalledWith("/sign-in");
    expect(toastMock).toHaveBeenCalledWith({
      title: "You have successfully registered! You can now sign.",
    });
  });
});
