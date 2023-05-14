import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

const CheckoutForm = ({ price, orderID }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { user, token } = useSelector((state) => state.auth);

  // STEP 1: create a payment intent and getting the secret
  useEffect(() => {
    async function getClientSecret() {
      const config = { "Content-Type": "application/json" };
      const { data } = await axiosInstance.post(
        "/api/orders/stripe-payment",
        { price, email: user?.email },
        config
      );
      setClientSecret(data.clientSecret);
    }
    if (user && price) getClientSecret();
  }, [price, user]);

  // STEP 2: make the payment after filling the form properly
  const makePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (clientSecret) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
      if (!payload.error) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // const config = { "Content-Type": "application/json" };
        const { data } = await axiosInstance.patch(
          `/api/orders/pay/${orderID}`,
          {
            ...payload.paymentIntent,
            paymentMode: "Stripe",
          },
          config
        );
        window.location.reload();
      } else {
        setError(payload.error.message);
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <form className="mx-auto max-w-screen-md" onSubmit={makePayment}>
      {error && <div className="alert-error">{error}</div>}
      <div className="my-2">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          id="card-element"
        />
      </div>
      <div className="mb-4">
        <button disabled={!stripe} className="primary-button">
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
