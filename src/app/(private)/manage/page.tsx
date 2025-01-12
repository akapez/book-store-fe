import { Metadata } from "next";

import UserUpdateForm from "./components/UserUpdateForm";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return <UserUpdateForm />;
};

export default ProfilePage;
