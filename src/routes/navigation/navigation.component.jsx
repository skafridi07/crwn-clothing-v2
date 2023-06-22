import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigation.styles.jsx";

const Navigation = () => {
  const { isCartOpen } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CardDropdown />}
      </NavigationContainer>
      {/* Based on relative path to navigation outlet will render different components */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
