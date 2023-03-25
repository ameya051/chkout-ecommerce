import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [hidden, setHidden] = useState(true);

  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
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
        <h1 className="mb-4 md:mb-8 text-xl font-semibold text-center">Login</h1>
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
            className="w-full"
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
            className="w-full"
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

        <div className="mb-4">
          <button className="primary-button">Login</button>
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
      </form>
    </Layout>
  );
};

export default Login;
