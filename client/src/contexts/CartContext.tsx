import { type ReactNode, createContext, useContext, useState } from "react";
import type { Product } from "../types/product";

type CartContextType = {
  carts: Product[];
  addToCart: (product: Product) => void;
};

type ChildrenType = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: ChildrenType) {
  const [carts, setCarts] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCarts([...carts, product]);
  };

  return (
    <CartContext.Provider value={{ carts, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const cart = useContext(CartContext);

  if (cart == null) {
    throw new Error("useCart has to be used within <CartProvider>");
  }

  return cart;
};
