import Image from "next/image";
import Link from "next/link";
import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Layout from "../components/Layout";
import { AppState } from "../utils/Store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import axios from "axios";

const Cart = () => {
  const { state, dispatch } = AppState();
  const { cart } = state;
  const { cartItems } = cart;

  const router = useRouter();

  const handleIncrement = async (item) => {
    const quantity = item.quantity + 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Product is out of stock.");
    } else {
      dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    }
  };

  const handleDecrement = (item) => {
    const quantity = item.quantity - 1;

    if (quantity === 0) {
      toast("Product quantity can't be decreased.", {
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
      dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    }
  };

  const handleRemoveItem = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-2xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="group text-grey-900 transition-all duration-300 ease-in-out mb-12">
          Cart is empty.{" "}
          <Link
            href="/"
            className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
          >
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full table-fixed">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.slug} className="border-b">
                      <td className="px-5">
                        <Link
                          className="flex flex-row items-center"
                          href={`/product/${item.slug}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={50}
                            width={50}
                            className="mr-4 mt-2"
                          ></Image>
                          <div className="mr-6 md:mr-2">{item.name}</div>
                        </Link>
                      </td>
                      <td className="p-5 text-right flex flex-row-reverse">
                        <button
                          className="primary-button"
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </button>
                        <span className="py-2 px-4 mt-2 text-center border">
                          {item.quantity}
                        </span>
                        <button
                          className="primary-button"
                          onClick={() => {
                            handleDecrement(item);
                          }}
                        >
                          -
                        </button>
                      </td>
                      <td className="p-5 text-right">$ {item.price}</td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => {
                            handleRemoveItem(item);
                          }}
                        >
                          <XCircleIcon className="h-6 w-6"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="box p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce((a, c) => {
                    return a + c.quantity;
                  }, 0)}
                  ): ${" "}
                  {cartItems.reduce((a, c) => {
                    return a + c.quantity * c.price;
                  }, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
