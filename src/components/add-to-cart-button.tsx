"use client";

import { Button } from "@components/ui/button";

export function AddToCartButton() {
  const handleAddToCart = () => {
    // Handle adding to cart
    console.log("Added to cart");
  };

  return (
    <Button onClick={handleAddToCart} className="mt-6 w-full" size="lg">
      Add to Cart
    </Button>
  );
}
