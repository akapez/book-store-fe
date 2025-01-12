import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import { Button } from "@components/ui/button";

export function EmptyCart() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center p-5 text-center">
      <ShoppingBag className="mb-4 h-16 w-16 text-gray-400" />
      <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
      <p className="mb-4 text-gray-600">
        Looks like you haven&apos;t added any books to your cart yet.
      </p>
      <Link href="/">
        <Button>Start Shopping</Button>
      </Link>
    </div>
  );
}
