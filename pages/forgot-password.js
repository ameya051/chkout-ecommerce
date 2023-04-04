import axios from "../utils/axiosInstance.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../components/Layout.js";
import { getError } from "../utils/error.js";

const ForgotPassword = () => {
  const [showLoading, setShowLoading] = useState(false); // to display loader after user submits the email to reset password
  const [emailSent, setEmailSent] = useState(false); //to display a message that email is sent to reset password

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email }) => {
    try {
      console.log(email);
      setShowLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users/reset`,
        { email: email },
        config
      );

      if (data) {
        setEmailSent(true);
      }
      setShowLoading(false);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Forgot Password">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
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
        {showLoading ? (
          <button
            type="button"
            disabled
            class="mt-2 mb-4 inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-2 border border-gray-700 bg-gray-700 px-3 py-2 text-sm font-medium text-white transition hover:border-gray-800 hover:bg-gray-800 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:pointer-events-none disabled:opacity-75"
          >
            <svg class="h-4 w-4 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-gray-800"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-gray-100"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
            <span>Loading...</span>
          </button>
        ) : (
          <div className="mt-2 mb-4">
            <button className="primary-button">Send Link</button>
          </div>
        )}
        {emailSent && (
          <>
            <div className="text-sm mb-4 text-gray-600">
              You'll soon receive a link at your entered email to reset
              password!
            </div>
          </>
        )}
      </form>
    </Layout>
  );
};

export default ForgotPassword;
