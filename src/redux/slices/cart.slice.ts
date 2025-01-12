"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  books: {
    id: string;
    title: string;
    image: string;
    author: string;
    price: number;
    quantity: number;
  }[];
}

const initialState: CartState = {
  books: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        image: string;
        author: string;
        price: number;
        quantity: number;
      }>
    ) => {
      const item = action.payload;
      const existItem = state.books.find((x) => x.id === item.id);
      if (existItem) {
        state.books = state.books.map((x) =>
          x.id === existItem.id
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      } else {
        state.books.push(item);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.books = state.books.filter((x) => x.id !== id);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.books.find((x) => x.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.books.find((x) => x.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
