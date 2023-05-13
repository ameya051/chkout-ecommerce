import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tiny-tan-rabbit-veil.cyclic.app",
});

export default axiosInstance;
