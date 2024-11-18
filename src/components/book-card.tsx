import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface BookCardProps {
  bookId: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

export default function BookCard({
  bookId,
  title,
  author,
  price,
  imageUrl,
}: BookCardProps) {
  return (
    <Link href={`/${bookId}`}>
      <Card
        className="w-72 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        data-testid={`book-card-${bookId}`}
      >
        <CardHeader>
          <div className="relative aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="border-t p-4">
          <CardTitle data-testid="book-title">{title}</CardTitle>
          <CardDescription data-testid="book-author">{author}</CardDescription>
          <p
            data-testid="book-price"
            className="mt-2 text-sm text-muted-foreground"
          >
            ${price.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
