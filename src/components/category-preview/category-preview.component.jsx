import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import "./category-preview.syles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          //  the underscore _ is used as a placeholder for the product argument because it is not being used in the callback logic.
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
export default CategoryPreview;
