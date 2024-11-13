import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

export default function BookCard({
  title,
  author,
  price,
  imageUrl,
}: BookCardProps) {
  return (
    <Card className="w-72 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
        <CardTitle>{title}</CardTitle>
        <CardDescription>{author}</CardDescription>
        <p className="mt-2 text-sm text-muted-foreground">
          ${price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
