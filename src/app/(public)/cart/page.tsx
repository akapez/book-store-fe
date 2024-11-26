import { Metadata } from "next";

import CartSection from "./sub-components/cart-section";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = () => {
  return <CartSection />;
};

export default CartPage;
