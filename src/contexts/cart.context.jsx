import { createContext, useState } from "react";

export const СartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <СartContext.Provider value={value}> {children} </СartContext.Provider>
};