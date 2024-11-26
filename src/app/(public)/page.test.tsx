import "@testing-library/jest-dom";

import Image from "next/image";

import { render, screen } from "@testing-library/react";

import HomePage from "./page";

interface CardProps {
  bookId: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

const mockBook = {
  bookId: "75709818-8bf0-4c76-a25b-9d2d536b9c64",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  price: 10.65,
  image:
    "https://res.cloudinary.com/dsoeni91r/image/upload/v1732424256/ywq3sylyzepi2benymoj.jpg",
};

jest.mock(
  "@components/book-card",
  () =>
    function BookCard({ title, author, price, imageUrl }: CardProps) {
      return (
        <div data-testid="book-card">
          <p>{title}</p>
          <p>{author}</p>
          <p>{price}</p>
          <Image src={imageUrl} alt={title} width={200} height={300} />
        </div>
      );
    }
);

describe("RSC HomePage", () => {
  it("renders the BookCard component with correct data", async () => {
    render(await HomePage());

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    expect(screen.getByText(mockBook.price.toString())).toBeInTheDocument();
    const image = screen.getByAltText(mockBook.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockBook.image);
  });
});
