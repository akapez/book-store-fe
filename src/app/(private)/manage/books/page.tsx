import { Metadata } from "next";

import BookCreateForm from "./sub-components/book-create-form";

export const metadata: Metadata = {
  title: "Books Manage",
};

const BooksManagePage = () => {
  return <BookCreateForm />;
};

export default BooksManagePage;
