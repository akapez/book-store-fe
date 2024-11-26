import "@testing-library/jest-dom";

import { getBook } from "@actions/book";
import { render, screen } from "@testing-library/react";

import BookDetailsPage from "./page";

jest.mock("@actions/book");

describe("RSC BookDetailsPage", () => {
  it("renders book details correctly", async () => {
    const mockBook = {
      bookId: "75709818-8bf0-4c76-a25b-9d2d536b9c64",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.65,
      category: "Fiction",
      image:
        "https://res.cloudinary.com/dsoeni91r/image/upload/v1732424256/ywq3sylyzepi2benymoj.jpg",
      count_in_stock: 15,
      description: "A novel written by American author F. Scott Fitzgerald.",
    };

    (getBook as jest.Mock).mockResolvedValue(mockBook);

    const params = Promise.resolve({
      bookId: "75709818-8bf0-4c76-a25b-9d2d536b9c64",
    });
    render(await BookDetailsPage({ params }));

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockBook.author}`)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockBook.price.toString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`In Stock: ${mockBook.count_in_stock.toString()}`)
    ).toBeInTheDocument();
  });
});
