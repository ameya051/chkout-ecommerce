import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  const [hidden, setHidden] = useState(true);
  const [chidden, setcHidden] = useState(true);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

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
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="w-full rounded-none border-gray-400 mt-2"
            id="name"
            autoFocus
            {...register("name", {
              required: "Please enter name",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

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
            className="w-full rounded-none border-gray-400 mt-2"
            id="email"
          ></input>
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
            className="w-full rounded-none border-gray-400 mt-2"
            id="password"
            autoFocus
          ></input>
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
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full rounded-none border-gray-400 mt-2"
            type={chidden ? "password" : "text"}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please enter confirm password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "confirm password is more than 5 chars",
              },
            })}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setcHidden(!chidden);
            }}
          >
            {chidden ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-900 absolute top-10 right-3  cursor-pointer" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-900 absolute top-10 right-3  cursor-pointer" />
            )}
          </button>
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>
        <div className="text-sm mb-4 text-gray-600 transition-all duration-300 ease-in-out">
          Already have an account? &nbsp;
          <Link
            className="bg-left-bottom bg-gradient-to-r from-gray-600 to-gray-600 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-300 ease-out"
            href={`/login?redirect=${redirect || "/"}`}
          >
            Login
          </Link>
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Register</button>
        </div>
      </form>
    </Layout>
  );
}
