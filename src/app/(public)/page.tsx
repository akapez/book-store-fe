import { Suspense } from "react";

import { getAllBooks } from "@actions/book";

import BookCard from "@components/book-card";
import { Skeleton } from "@components/ui/skeleton";

const HomePage = async () => {
  const data = await getAllBooks();

  return (
    <div className="mb-36 mt-10 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.books.map((book) => (
          <Suspense
            key={book.id}
            fallback={<Skeleton className="m-4 w-full rounded-lg shadow-lg" />}
          >
            <BookCard
              key={book.id}
              bookId={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              imageUrl={book.image}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
