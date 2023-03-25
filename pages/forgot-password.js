import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout.js";

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Layout title="Forgot Password">
      <form className="mx-auto max-w-screen-md">
        <h1 className="mb-4 md:mb-8 text-xl font-semibold text-center">
          Forgot password?
        </h1>
        <h3 className="mb-4 md:mb-8 text-sm text-gray-600">
          Please enter the email address you used to create your account, and
          we&apos;ll send you a link to reset your password.
        </h3>
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
          className="w-full rounded-none border-gray-400 mt-2"
          autoFocus
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <div className="mt-2 mb-4">
          <button className="primary-button">Login</button>
        </div>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
