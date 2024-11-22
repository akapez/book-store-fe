"use server";

const BASE_URL = process.env.API_BASE_URL as string;

export async function createUser(
  email: string,
  password: string,
  first: string,
  last: string
): Promise<any> {
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
    console.error("Error creating user:", error);
  }
}
