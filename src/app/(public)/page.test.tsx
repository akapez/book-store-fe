import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { books } from "../../../books";
import HomePage from "./page";

interface CardProps {
  bookId: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

jest.mock(
  "@components/book-card",
  () =>
    ({ title, author, price, imageUrl }: CardProps) => (
      <div data-testid="book-card">
        <p>{title}</p>
        <p>{author}</p>
        <p>{price}</p>
        <img src={imageUrl} alt={title} />
      </div>
    )
);

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(<HomePage />);
  });

  it("displays the correct number of books", () => {
    render(<HomePage />);
    const bookCards = screen.getAllByTestId("book-card");
    expect(bookCards.length).toBe(books.length);
  });

  it("displays the book details correctly", () => {
    render(<HomePage />);
    books.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(book.author)).toBeInTheDocument();
      expect(screen.getByText(book.price)).toBeInTheDocument();
      expect(screen.getByAltText(book.title)).toBeInTheDocument();
    });
  });
});
