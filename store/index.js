import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import cartSlice from "./slices/cartSlice.js";

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
