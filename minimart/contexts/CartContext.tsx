// contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types'; // Import your types

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void; //  Accepts a Product
  removeFromCart: (productId: number) => void; // Accepts productId (number)
  increaseQuantity: (productId: number) => void; // Accepts productId (number)
  decreaseQuantity: (productId: number) => void; // Accepts productId (number)
  clearCart: () => void; // To clear the entire cart
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => { // Changed parameter from 'item' to 'product'
    setCartItems((prev) => {
      const existingCartItem = prev.find((cartItem) => cartItem.product.id === product.id); // Check product.id
      if (existingCartItem) {
        return prev.map((cartItem) =>
          cartItem.product.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { product, quantity: 1 }]; // Create new CartItem with product and quantity 1
    });
  };

  const removeFromCart = (productId: number) => { // Changed parameter from 'id' to 'productId' (number)
    setCartItems((prev) => prev.filter((cartItem) => cartItem.product.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.product.id === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((cartItem) =>
          cartItem.product.id === productId
            ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } // Ensure quantity doesn't go below 0
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};