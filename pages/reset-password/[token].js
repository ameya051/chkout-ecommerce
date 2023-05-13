import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { getError } from "../../utils/error";
import axios from "axios";

const ResetPassword = () => {
  const router = useRouter();

  const [hidden, setHidden] = useState(true);
  const [chidden, setcHidden] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/login");
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => clearTimeout(timeoutId);
  }, [router]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ new_password }) => {
    try {
      const { token } = router.query;
      console.log(token, " ", new_password)
      setShowLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.patch(
        `https://tiny-tan-rabbit-veil.cyclic.app/api/users/reset`,
        { token: token, password: new_password },
        config
      );

      if (data) {
        toast.success("Password reset successfully.");
        router.push("/login");
      }
      setShowLoading(false);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Layout title="Reset Password">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 md:mb-8 text-xl font-semibold text-center">
          Reset your password
        </h1>
        <div className="mb-4 relative">
          <label htmlFor="new_password">Enter New Password</label>
          <input
            type={hidden ? "password" : "text"}
            {...register("new_password", {
              required: "Please enter new password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            className="w-full rounded-none border-gray-400 mt-2"
            id="new_password"
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
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full rounded-none border-gray-400 mt-2"
            type={chidden ? "password" : "text"}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please enter confirm password",
              validate: (value) => value === getValues("new_password"),
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
        {showLoading ? (
          <button
            type="button"
            disabled
            class="mt-2 mb-4 inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-2 border border-slate-700 bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:border-slate-800 hover:bg-slate-800 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:pointer-events-none disabled:opacity-75"
          >
            <svg class="h-4 w-4 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-slate-800"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                class="fill-slate-100"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
            <span>Loading...</span>
          </button>
        ) : (
          <div className="mt-2 mb-4">
            <button className="primary-button">Reset</button>
          </div>
        )}
      </form>
    </Layout>
  );
};

export default ResetPassword;
