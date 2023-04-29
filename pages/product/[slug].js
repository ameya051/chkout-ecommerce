import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import axios from "../../utils/axiosInstance.js";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../store/slices/cartSlice";
import Reviews from "../../components/Reviews";

const ProductScreen = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { product } = props;

  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const handleAddToCart = async () => {
    const existItem = cart.cartItems.find((item) => {
      return item.slug === product.slug;
    });
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Product is out of stock.");
      return;
    } else {
      dispatch(addCart({ ...product, quantity }));
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
                    className="font-medium text-gray-600 hover:underline"
                  >
                    ({product.numReviews})
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
                <div>&#x20B9;{product.price}</div>
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
        <Reviews product={product} user={user} />
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
