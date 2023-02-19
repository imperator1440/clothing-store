import { useContext } from 'react';

import { СartContext } from '../../contexts/cart.context'

import { 
  CheckOutItemContainer, 
  ImageContainer,
  Name, 
  Quantity, 
  Arrow, 
  Value, 
  Price, 
  RemoveButton, 
} from './checkout-item.styles'

const CheckOutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(СartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);


  return (
    <CheckOutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>      
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckOutItemContainer>
  );
};

export default CheckOutItem;