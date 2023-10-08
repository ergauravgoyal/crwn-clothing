import React, { useContext } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      {/* <ShoppingIcon className="shopping-icon" /> */}
      <img
        src="https://stackblitz-starters-kxhgru.stackblitz.io/assets/shopping-bag.svg"
        className="shopping-icon"
      />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
