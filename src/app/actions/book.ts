"use server";

import { options } from "@auth/options";
import type { Book } from "@utils/types";
import { getServerSession } from "next-auth";

const BASE_URL = process.env.API_BASE_URL as string;

type BookResponse = {
  books: Book[];
};

type FormState = {
  success: boolean;
  message: string;
  book?: Book;
};

export async function createBook(formData: FormData): Promise<FormState> {
  try {
    const session = await getServerSession(options);
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: "Book created.",
        book: data,
      };
    } else {
      return { success: false, message: "Something went wrong." };
    }
  } catch (error) {
    console.log("Error creating book:", error);
    return { success: false, message: "Error creating book." };
  }
}

export async function getAllBooks(): Promise<BookResponse> {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const books = await response.json();
    if (response.ok) {
      return { books: books };
    } else {
      return { books: [] };
    }
  } catch (error) {
    console.log(error);
    return { books: [] };
  }
}

export async function getBook(id: string): Promise<Book | null> {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    const book = await response.json();
    if (response.ok) {
      return book;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
