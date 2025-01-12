import { Metadata } from "next";

import CartSection from "./components/CartSection";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = () => {
  return <CartSection />;
};

export default CartPage;
