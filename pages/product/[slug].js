import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { AppState } from "../../utils/Store";
import axios from "../../utils/axiosInstance.js";
import { useForm } from "react-hook-form";
import { getError } from "../../utils/error";
import Rating from "../../components/Rating";

const ProductScreen = (props) => {
  const { product } = props;
  const { state, dispatch } = AppState();

  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("user"));
    setUser(data);
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ rating, comment }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/products/reviews/${product._id}`,
        {
          rating,
          comment,
        }
      );
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
      const { data } = await axios.get(`/api/products/reviews/${product._id}`);
      setReviews(data);
    } catch (err) {
      toast.error(getError(err));
    }
  }, [product]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const handleAddToCart = async () => {
    const existItem = state.cart.cartItems.find((item) => {
      return item.slug === product.slug;
    });
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Product is out of stock.");
      return;
    } else {
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
      // router.push("/cart");
    }
  };

  return (
    <Layout title={product.name}>
      <div>
        <div className="py-4">
          <Link href="/" className="hover:underline">
            Back to home
          </Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3 mb-8">
          <div className="image-container">
            <div className="image">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
              />
            </div>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {product.name}
                </h1>
              </li>
              <li className="flex flex-row">
                {product.rating}
                <div className="flex text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <a
                    href="#reviews"
                    class="font-medium text-gray-600 hover:underline"
                  >
                    (14)
                  </a>
                </div>
              </li>
              <li>
                <p className="font-medium text-gray-600">
                  Brand: {product.brand}
                </p>
              </li>
              <li>
                <p className="font-medium text-gray-600">
                  Category: {product.category}
                </p>
              </li>
              <li>
                <h3 class="font-medium capitalize text-gray-600 mb-1 underline">
                  Description
                </h3>
                <div class="leading-7 description">
                  <p>
                    <span
                      style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "rgb(0, 0, 0)",
                      }}
                    >
                      {product.description}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Price:</div>
                <div>$ {product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status:</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavailiable"}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
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
      </div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const config = { "Content-Type": "application/json" };
  const { data } = await axios.get(`/api/products/${slug}`, config);

  return {
    props: {
      product: data,
    },
  };
}
