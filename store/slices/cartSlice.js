import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart"))
      : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
  },
  reducers: {
    addCart: (state, { payload }) => {
      const newItem = payload;
      const existItem = state.cart.cartItems.find((item) => {
        return item.slug === newItem.slug;
      });
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => {
            return item.name === existItem.name ? newItem : item;
          })
        : [...state.cart.cartItems, newItem];
      state.cart.cartItems = cartItems;
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
    },
    removeItem: (state, { payload }) => {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== payload.slug
      );
      state.cart.cartItems = cartItems;
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
    },
    clearCart: (state) => {
      state.cart.cartItems = [];
    },
    resetCart: (state) => {
      state.cart.cartItems = [];
      state.cart.shippingAddress = { location: {} };
      state.cart.paymentMethod = "";
    },
    saveShippingAdd: (state, { payload }) => {
      state.cart.shippingAddress = payload;
    },
    savePaymentMethod: (state, { payload }) => {
      state.cart.paymentMethod = payload;
    },
  },
});

export const {
  addCart,
  removeItem,
  clearCart,
  resetCart,
  saveShippingAdd,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
