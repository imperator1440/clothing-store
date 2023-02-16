import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const exsistingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if(exsistingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const exsistingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if(exsistingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) => 
    cartItem.id === productToRemove.id 
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, itemToClear) => cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);

export const СartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => { 
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => { 
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove))
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

  return <СartContext.Provider value={value}> {children} </СartContext.Provider>
};