import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const cartData = Cookies.get("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];
function allItems(data) {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }
  return items;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [],
    items: cartArray.length > 0 ? allItems(cartArray) : 0,
    shippingAddress: {},
    paymentMethod: "",
  },
  reducers: {
    addCart: (state, { payload }) => {
      state.cart.push(payload);
      state.items += payload.quantity;
    },
    incQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        find.quantity += 1;
        state.items += 1;
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      }
    },
    decQuantity: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      }
    },
    removeItem: (state, { payload }) => {
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= find.quantity;
        state.cart.splice(index, 1);
        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.items = 0;
    },
    resetCart: (state) => {
      state.cart = [];
      state.items = 0;
      state.shippingAddress = {};
      state.paymentMethod = "";
    },
    saveShippingAdd: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

export const {
  addCart,
  incQuantity,
  decQuantity,
  removeItem,
  clearCart,
  resetCart,
  saveShippingAdd,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
