import { Cart } from "@utils/types";

import { getProductById } from "./products";

const cart: Cart = {
  products: [
    {
      id: "01",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "/castle-t-shirt.jpg",
      price: 25,
    },
    {
      id: "02",
      title: "Dragon T-Shirt",
      image: "/dragon-t-shirt.jpg",
      price: 25,
    },
  ],
};

export const getCart = async (): Promise<Cart> => {
  return cart;
};

export const addToCart = async (productId: number): Promise<Cart> => {
  const product = await getProductById(productId);
  if (product) {
    cart.products.push({
      name: product.name,
      id: product.id,
      image: product.image,
      price: product.price,
    });
  }
  return cart;
};

export const clearCart = async (): Promise<Cart> => {
  cart.products = [];
  return cart;
};
