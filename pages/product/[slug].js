import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { AppState } from "../../utils/Store";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProductScreen = (props) => {
  const { status, data: session } = useSession();
  const { product } = props;
  const { state, dispatch } = AppState();
  const router = useRouter();
  console.log(router);

  // const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/products/${product._id}/reviews`, {
        rating,
        comment,
      });
      setLoading(false);
      toast("Review submitted successfully");
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const handleAddToCart = async () => {
    const existItem = state.cart.cartItems.find((item) => {
      return item.slug === product.slug;
    });

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast("Product is out of stock.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
      return;
    } else {
      dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
      router.push("/cart");
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
              <li>
                <div className="flex items-center text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-6 w-6"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-6 w-6"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-6 w-6"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-6 w-6"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    ></path>
                  </svg>
                  <a href="#reviews" class="flex text-black">
                    14{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="black"
                      aria-hidden="true"
                      class="h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </li>
              <li>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  Brand: {product.brand}
                </p>
              </li>
              <li>
                <p className="text-xl font-bold text-gray-900 mb-2">
                  Category: {product.category}
                </p>
              </li>
              <li>
                <h3 class="font-medium capitalize text-gray-600 mb-2 underline">
                  description
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
          {session?.user ? (
            <form onSubmit={submitHandler} className="p-4 border">
              <h2 className="text-xl mb-1">Write your review!</h2>
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
          {reviews.length === 0 && <div className="mb-4">No reviews.</div>}
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                <div className="mt-3 p-3 shadow-inner dark:shadow-gray-700">
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
  const { data } = await axios.get(
    `http://localhost:5000/api/products/${slug}`
  );

  return {
    props: {
      product: data,
    },
  };
}
