"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Product } from "@/types/Product";

type CartContextType = {
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
  toggleCartItemQuantity: (id: string, value: string) => void;
  resetQty: () => void;
};

const defaultContext: CartContextType = {
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
  onRemove: () => {},
  toggleCartItemQuantity: () => {},
  resetQty: () => {},
};

const CartContext = createContext(defaultContext);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const resetQty = () => setQty(1);

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item: Product) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: Product) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: qty + quantity };
        } else {
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      setQty(quantity);
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const onRemove = (product: Product) => {
    const productToRemove = cartItems.find((item) => item._id === product._id);
    if (!productToRemove) {
      return;
    }

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - product.price * product.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - product.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item._id === id) {
          if (value === "inc") {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
            setTotalQuantities(
              (prevTotalQuantities) => prevTotalQuantities + 1
            );
            return { ...item, quantity: item.quantity + 1 };
          } else if (value === "dec" && item.quantity > 1) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
            setTotalQuantities(
              (prevTotalQuantities) => prevTotalQuantities - 1
            );
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        resetQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useStateContext = () => useContext(CartContext);
