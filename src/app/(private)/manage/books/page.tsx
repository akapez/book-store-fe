import { Metadata } from "next";

import BookCreateForm from "./components/BookCreateForm";

export const metadata: Metadata = {
  title: "Books Manage",
};

const BooksManagePage = () => {
  return <BookCreateForm />;
};

export default BooksManagePage;
