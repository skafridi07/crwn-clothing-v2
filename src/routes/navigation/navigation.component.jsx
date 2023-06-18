import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
  const { isCartOpen } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CardDropdown />}
      </div>
      {/* Based on relative path to navigation outlet will render different components */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
