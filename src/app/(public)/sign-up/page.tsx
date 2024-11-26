import type { Metadata } from "next";

import SignUpForm from "./sub-components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a Booktopia account to discover new books, access exclusive deals, and personalize your reading experience. Sign up today!",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
