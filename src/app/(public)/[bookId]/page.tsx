import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBook } from "@actions/book";
import { ChevronLeft } from "lucide-react";

import AddToCartButton from "@components/add-to-cart-button";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

type MetadataProps = {
  params: Promise<{ bookId: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const id = (await params).bookId;
  const book = await getBook(id);
  if (!book) {
    notFound();
  }
  return {
    title: book?.title,
    description: book?.description,
  };
}

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const id = (await params).bookId;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }
  return (
    <div className="mx-auto mb-40 max-w-4xl p-5 md:p-6 lg:p-8">
      <Link href="/">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
      </Link>
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[400px] w-full">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <span className="text-sm text-muted-foreground">
              {book.category}
            </span>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                ${book.price.toFixed(2)}
              </span>
              <Badge
                variant={book.count_in_stock > 0 ? "secondary" : "destructive"}
                className="text-sm"
              >
                {book.count_in_stock > 0
                  ? `In Stock: ${book.count_in_stock}`
                  : "Out of Stock: 0"}
              </Badge>
            </div>
            <Card>
              <CardContent className="p-4">
                <h2 className="mb-2 text-xl font-semibold">Description</h2>
                <p className="text-muted-foreground">{book.description}</p>
              </CardContent>
            </Card>
          </div>
          <AddToCartButton book={book} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
