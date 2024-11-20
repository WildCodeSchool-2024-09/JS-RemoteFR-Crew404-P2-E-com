import { createContext, useContext, useState } from "react";
import type { Product } from "../types/product";

const CartContext = createContext<CartContextType | null>(null);

type CartContextType = {
  carts: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  totalPrice: number;
  nbCart: number;
  message: string | null;
};

type ChildrenType = {
  children: React.ReactNode;
};

export function CartProvider({ children }: ChildrenType) {
  const [carts, setCarts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCarts([...carts, product]);

    const newTotalPrice = totalPrice + product.price;
    setTotalPrice(newTotalPrice);

    setMessage(`${product.name} a été ajouté au panier`);
    setTimeout(() => setMessage(null), 3000);
  };

  const removeFromCart = (productId: string) => {
    setCarts(carts.filter((product) => product.id !== productId));
    const newTotalPrice =
      totalPrice -
      (carts.find((product) => product.id === productId)?.price ?? 0);
    setTotalPrice(newTotalPrice);
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        totalPrice,
        nbCart: carts.length,
        message,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cart;
};
