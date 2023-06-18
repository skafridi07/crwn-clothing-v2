import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CardDropdown = ({ toggle }) => {
  return (
    <div
      className="cart-dropdown-container"
      style={{ display: `${toggle ? "none" : "block"}` }}
    >
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};
export default CardDropdown;
