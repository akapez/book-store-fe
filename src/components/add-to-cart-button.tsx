"use client";

import { useAppDispatch } from "@hooks/use-redux";
import { useToast } from "@hooks/use-toast";
import { addToCart } from "@lib/features/cartSlice";
import type { Book } from "@utils/types";

import { Button } from "./ui/button";

interface AddToCartButtonProps {
  book: Book;
}

export default function AddToCartButton({ book }: AddToCartButtonProps) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: book.id,
        title: book.title,
        image: book.image,
        author: book.author,
        price: book.price,
        quantity: 1,
      })
    );
    toast({
      title: `${book.title} added.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="mt-6 w-full" size="lg">
      Add to Cart
    </Button>
  );
}
