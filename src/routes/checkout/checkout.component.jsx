import { useContext } from 'react';

import { СartContext } from '../../contexts/cart.context'

import CheckOutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles'

const CheckOut = () => {
  const { cartItems, cartTotal } = useContext(СartContext);

  return (
    <CheckoutContainer> 
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return (
          <CheckOutItem key={cartItem.id} cartItem={cartItem} />
        );
      })}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default CheckOut;