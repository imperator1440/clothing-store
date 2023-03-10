import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CardDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CardDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  }, []);
  
  return (
    <CardDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CardDropdownContainer>
  );
};

export default CardDropdown;