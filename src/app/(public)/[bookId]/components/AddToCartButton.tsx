"use client";

import type { Book } from "@definitions/book";
import { useAppDispatch } from "@hooks/useRedux";
import { useToast } from "@hooks/useToast";
import { addToCart } from "@redux/slices/cart.slice";

import { Button } from "@components/ui/button";

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
