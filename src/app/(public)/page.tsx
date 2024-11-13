import BookCard from "@components/book-card";

import { books } from "../../../books";

export default function Home() {
  return (
    <div className="mb-36 mt-10 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            price={book.price}
            imageUrl={book.image}
          />
        ))}
      </div>
    </div>
  );
}
