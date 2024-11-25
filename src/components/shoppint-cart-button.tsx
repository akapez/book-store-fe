"use client";

import { useAppSelector } from "@hooks/use-redux";
import { ShoppingCart } from "lucide-react";

import { Button } from "./ui/button";

export default function ShoppingCartButton() {
  const cartState = useAppSelector((state) => state.cart.books);
  return (
    <Button variant="outline" size="icon" className="relative">
      <ShoppingCart />
      {cartState.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[0.6rem] font-medium text-slate-50">
          {cartState.length}
        </span>
      )}
      <span className="sr-only">Shopping cart</span>
      <span className="sr-only">{cartState.length} items</span>
    </Button>
  );
}
