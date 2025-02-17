import type { Metadata } from "next";

import SignInForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Welcome back to Booktopia! Sign in to your account to access your order history and personalized recommendations.",
};

const SignInPage = () => {
  return <SignInForm />;
};

export default SignInPage;
