import { useContext } from 'react';

import { СartContext } from '../../contexts/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount }  from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, cartCount, setIsCartOpen } = useContext(СartContext)

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;