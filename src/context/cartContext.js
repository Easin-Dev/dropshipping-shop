"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. Context toiri kora hocche
const CartContext = createContext();

// 2. Ekti custom hook toiri kora hocche jate onnano component e kolay context use kora jay
export const useCart = () => useContext(CartContext);

// 3. Provider component toiri kora hocche, ja shob state o function dharon korbe
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Shurute, page load hoar shomoy localStorage theke cart er data load korbe
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("shopping-cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // Jokhonই cartItems poriborton hobe, tokhon localStorage e data save korbe
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart e notun product jog korar function
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Cart theke product shoriye felar function
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  // Product er quantity poriborton korar function
  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // FIX: Checkout-er por cart porishkar korar jonno function
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("shopping-cart");
  };

  // Cart e total kotogulo item ache ta hisheb korbe
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Cart er shob product er মোট দাম hisheb korbe
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shob state o function gulo value hishebe pathano hocche
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart, // FIX: clearCart function-ti ekhane jog kora holo
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
