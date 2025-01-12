"use client";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@redux/slices/cart.slice";
import { Minus, Plus, ShoppingCart, TrashIcon } from "lucide-react";

import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

import { EmptyCart } from "./EmptyCart";

const CartSection = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart.books);

  if (cartState.length == 0) {
    return <EmptyCart />;
  }

  const totalPrice = cartState.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  return (
    <div className="container mx-auto mb-40 max-w-xl p-5">
      {cartState.map((book) => (
        <Card key={book.id} className="mb-4">
          <CardContent className="flex items-center p-4">
            <Image
              src={book.image}
              alt={book.title}
              width={75}
              height={100}
              className="mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-md mt-2 font-bold">${book.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(decrementQuantity(book.id))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-md mx-2 font-semibold">
                {book.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(incrementQuantity(book.id))}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
          <div className="flex justify-end pb-2 pr-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => dispatch(removeFromCart(book.id))}
            >
              <TrashIcon />
            </Button>
          </div>
        </Card>
      ))}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <Button size="sm">
          <ShoppingCart className="mr-2 h-5 w-5" /> Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSection;
