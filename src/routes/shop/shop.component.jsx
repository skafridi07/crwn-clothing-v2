import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/*  The :category is a placeholder that captures the value of the category parameter
       in the URL path. For example, if the URL path is "/electronics", the value of category
        will be "electronics". This route is used for dynamic category pages. */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
