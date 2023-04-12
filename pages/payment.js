import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/slices/cartSlice";

export default function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth)
  const {cart}=useSelector((state)=>state.cart)
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch(savePaymentMethod(selectedPaymentMethod))
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  useEffect(() => {
    function check(){
      // if()
      if (!shippingAddress?.address) {
        return router.replace("/shipping");
      }
    }
    check();
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl text-center">Payment Method</h1>
        {["Stripe", "Cash On Delivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.replace("/shipping")}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
