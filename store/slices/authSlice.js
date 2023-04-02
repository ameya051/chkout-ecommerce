import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const token = Cookies.get("token");

function verifyToken(keyName) {
  const storage = Cookies.get(keyName);
  if (storage) {
    const decodeToken = jwtDecode(storage);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      Cookies.remove(keyName);
      return null;
    } else {
      return storage;
    }
  } else {
    return null;
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: verifyToken("token"),
    user: token ? jwtDecode(token) : null,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      state.user = jwtDecode(payload);
    },
    logout: (state, {payload}) => {
      Cookies.remove(payload);
      state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
