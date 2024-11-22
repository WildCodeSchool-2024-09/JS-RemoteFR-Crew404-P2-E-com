import { type ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import type { Product } from "../types/product";

type CartContextType = {
  carts: Product[];
  addToCart: (product: Product) => void;
  deleteToCart: (id: string) => void;
  nbCart: number;
};

type ChildrenType = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: ChildrenType) {
  const [carts, setCarts] = useState<Product[]>([]);
  const notify = () => toast.error("Tu as bien supprimé le produit 😭");

  const addToCart = (product: Product) => {
    setCarts([...carts, product]);
  };

  const deleteToCart = (id: string) => {
    setCarts(carts.filter((produit) => produit.id !== id));
    notify();
  };

  return (
    <CartContext.Provider
      value={{ carts, addToCart, deleteToCart, nbCart: carts.length }}
    >
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
