import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const useOptions = () => {
  const options = {
    style: {
      base: {
        iconColor: '#bababa',
        color: '#333',
        backgroundColor: '#FFF',
        margin: '16px',
        fontWeight: '400',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#333',
        },
        '::placeholder': {
          color: '#999',
        },
      },
      invalid: {
        iconColor: 'red',
        color: 'red',
      },
    },
      
    }
  return options;
};

const CardPaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [cardholder, setCardholder] = useState('');

  const handleChange = (e) => { 
    setCardholder(e.target.value);
   }

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.createToken(elements.getElement(CardNumberElement), {
      name: cardholder
    });
    console.log("[Token]: ", result.token);
    if(result.error) {
      toast.error(result.error.message)
    }
    else if(result.token) {
      onSuccess(result.token.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="columns ">
        <div className="column">
          <label className="label ml0">
            Card number
          </label>
          <div className="input-card" >
            <CardNumberElement
              options={options} 
              
            />
          </div>
        </div>
      </div>
        
      <div className="columns">
        <div className="column">
        <div style={{ display: 'flex'}}>
          <div style={{ display: 'flex', flexDirection: "column", flex: 1 }}>
            <label className="label ml0">Expiration date</label>
            <div className="input-card" >
            <CardExpiryElement
              options={options}
            />
            </div>
          </div>
          <div className="ml10" style={{ display: 'flex', flexDirection: "column", flex: 1 }}>
            <label className="label ml0">CVV</label>
            <div className="input-card" >
            <CardCvcElement
              options={options}
            />
            </div>
          </div>
        </div>
        </div>
      </div>
        <div className="columns ">
            <div className="column ">
            <label className="label ml0">Card holder name</label>
            <input className="input has-input-background" type="text" name='cardholderName' value={cardholder} onChange={handleChange}/>
            </div>
        </div>
        <div className="columns is-centered mt120">
        <div className="column  is-half bottom-text-div">
          <button
          style={{ textAlign: 'center' }}
            className="button is-large is-rounded dashBtn"
            type="submit" disabled={!stripe}
            >
            Continue
          </button>
        </div>
        </div>

    </form>
  );
};

export default CardPaymentForm;
