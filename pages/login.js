import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { getError } from "../utils/error";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "../utils/axiosInstance.js";
import Cookies from "js-cookie";
import { setToken } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  const router = useRouter();
  const { redirect } = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const config = { "Content-Type": "application/json" };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      if (data.error) {
        toast.error(data.error);
      }
      Cookies.set("token", data.token);
      dispatch(setToken(data.token));
      toast.success("You've logged in successfully.");
      router.push(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 md:mb-8 text-xl font-semibold text-center">
          Login
        </h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            id="email"
            className="w-full rounded-none border-gray-300 mt-2"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password">Password</label>
          <input
            type={hidden ? "password" : "text"}
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            id="password"
            className="w-full rounded-none border-gray-300 mt-2"
            autoFocus
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setHidden(!hidden);
            }}
          >
            {hidden ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-900 absolute top-10 right-3  cursor-pointer" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-900 absolute top-10 right-3  cursor-pointer" />
            )}
          </button>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="flex-row flex justify-between">
          <div className="mb-4 text-gray-600 transition-all duration-300 ease-in-out">
            <Link
              className="text-sm bg-left-bottom bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 ease-out"
              href="forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-sm mb-4 text-gray-600 transition-all duration-300 ease-in-out">
            Don&apos;t have an account? &nbsp;
            <Link
              className="bg-left-bottom bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 ease-out"
              href="register"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <p className="text-sm">Admin email: admin@example.com Admin Password: 123456</p>
      </form>
    </Layout>
  );
};

export default Login;
