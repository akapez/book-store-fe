"use server";

import { options } from "@auth/options";
import { getServerSession } from "next-auth/next";

const BASE_URL = process.env.API_BASE_URL as string;

interface UserResponse {
  success: boolean;
  message: string;
  data?: {
    firstName: string;
    lastName: string;
    image: string;
  };
}

export async function createUser(
  email: string,
  password: string,
  first: string,
  last: string
): Promise<UserResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: first,
        last_name: last,
      }),
    });

    if (response.status === 403) {
      return { success: false, message: "User already exists." };
    } else if (response.status === 201) {
      return {
        success: true,
        message: "You have successfully registered! You can now sign.",
      };
    } else {
      return { success: false, message: "Something went wrong." };
    }
  } catch (error) {
    console.log("Error creating user:", error);
    return { success: false, message: "Error creating user." };
  }
}

export async function updateUser(formData: FormData): Promise<UserResponse> {
  try {
    const session = await getServerSession(options);
    const response = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: "Profile updated.",
        data: {
          firstName: data.user_info.first,
          lastName: data.user_info.last,
          image: data.user_info.image,
        },
      };
    } else {
      return { success: false, message: "Something went wrong." };
    }
  } catch (error) {
    console.log("Error updating user:", error);
    return { success: false, message: "Error updating user." };
  }
}
