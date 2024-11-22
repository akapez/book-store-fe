import { Metadata } from "next";

import UserUpdateForm from "./sub-components/user-update-form";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return <UserUpdateForm />;
};

export default ProfilePage;
