import axios from "axios";
import dotenv from 'dotenv'
dotenv.config({path: './env'});

const axiosInstance = axios.create({
  baseURL: 'https://ucfl5ba6p3.execute-api.ap-south-1.amazonaws.com',
  // baseURL: "http://localhost:5000"
});

export default axiosInstance;
