import axios from "axios";
import dotenv from 'dotenv'
dotenv.config({path: './env'});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://localhost:5000"
});

export default axiosInstance;
