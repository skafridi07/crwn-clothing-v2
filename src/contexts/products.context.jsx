import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

export const ProductContext = createContext({
  products: [],
});
const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
export default ProductsProvider;
