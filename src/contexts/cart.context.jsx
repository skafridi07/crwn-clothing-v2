import { createContext, useContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

const CardProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export default CardProvider;
