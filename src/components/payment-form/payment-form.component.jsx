import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProccessingPayment, setIsProccesstingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if(!stripe || !elements) {
      return;
    }

    setIsProccesstingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent',  {
      method: 'post',
      headers: {
        'Content-Type': 'applications/json'
      },
      body: JSON.stringify({ amount: amount*100 }),
    }).then(res => res.json());

    const {paymentIntent: { client_secret }} = response.paymentIntent.client_secret

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { 
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProccesstingPayment(false);

    if(paymentResult.error){
      alert(paymentResult.error);
    } else {
      if(paymentResult.paymentIntent.status === 'succeeded'){
        alert('Payment Successful');
      }
    }
  };

  return (
    <PaymentFormContainer> 
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card Payment:</h2>
        <CardElement />
        <Button isLoading={isProccessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;