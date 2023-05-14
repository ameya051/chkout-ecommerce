import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { getError } from "../utils/error";
import Rating from "./Rating";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Reviews({ product, user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { token } = useSelector((state) => state.auth);

  const submitHandler = async ({ rating, comment }) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axiosInstance.post(`/api/products/reviews/${product._id}`, {
        rating,
        comment,
      },config);
      setLoading(false);
      toast.success("Review submitted successfully");
      fetchReviews();
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  const fetchReviews = useCallback(async () => {
    try {
      if (!product) {
        return;
      }
      const { data } = await axiosInstance.get(
        `/api/products/reviews/${product._id}`
      );
      setReviews(data);
    } catch (err) {
      toast.error(getError(err));
    }
  }, [product]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div id="reviews">
      <div className="text-2xl mb-4 font-bold text-gray-900">
        Customer Reviews
      </div>
      {user ? (
        <form onSubmit={handleSubmit(submitHandler)} className="p-4 border">
          <h2 className="text-xl mb-1">Leave your review!</h2>
          <div className="mb-4">
            <label htmlFor="comment">Comment</label>
            <textarea
              className="w-full"
              id="comment"
              {...register("comment", {
                required: "Please enter comment",
              })}
            />
            {errors.comment && (
              <div className="text-red-500">{errors.comment.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="w-full"
              {...register("rating", {
                required: "Please enter rating",
              })}
            >
              <option value=""></option>
              {["1 star", "2 stars", "3 stars", "4 stars", "5 stars"].map(
                (x, index) => (
                  <option key={index + 1} value={index + 1}>
                    {x}
                  </option>
                )
              )}
            </select>
            {errors.rating && (
              <div className="text-red-500 ">{errors.rating.message}</div>
            )}
          </div>
          <div className="mb-4 ">
            <button disabled={loading} className="primary-button">
              {loading ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <div className="block p-6 border mb-4">
          <div className="text-grey-900 transition-all duration-300 ease-in-out">
            Please{" "}
            <Link
              className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              href={`/login?redirect=${router.asPath || "/"}`}
            >
              login
            </Link>{" "}
            to write a review.
          </div>
        </div>
      )}
      {reviews.length === 0 && (
        <div className="mb-4">No reviews yet, be the first one!</div>
      )}
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <div className="mt-3 p-3 dark:shadow-gray-700">
              <div>
                <strong>{review.name}</strong> on{" "}
                {review.createdAt.substring(0, 10)}
              </div>
              <Rating rating={review.rating}></Rating>
              <div>{review.comment}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Reviews), { ssr: false });
