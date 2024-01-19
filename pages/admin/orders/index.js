import axios from "../../../utils/axiosInstance.js";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import Layout from "../../../components/layout/Layout";
import getError from "../../../utils/error";
import Loading from "../../../components/Loading.js";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function Orders() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`/api/admin/orders`, config);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Orders">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul className="mt-4">
            <li className="text-grey-900 transition-all duration-300 ease-in-out mb-12">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                href="/admin"
              >
                Dashboard
              </Link>
            </li>
            <li className="text-grey-900 transition-all duration-300 ease-in-out mb-12">
              <Link
                className="font-semibold bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                href="/admin/orders"
              >
                Orders
              </Link>
            </li>
            <li className="text-grey-900 transition-all duration-300 ease-in-out mb-12">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                href="/admin/products"
              >
                Products
              </Link>
            </li>
            <li className="text-grey-900 transition-all duration-300 ease-in-out mb-12">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                href="/admin/users"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Orders</h1>

          {loading ? (
            <Loading />
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">USER</th>
                    <th className="p-5 text-left">DATE</th>
                    <th className="p-5 text-left">TOTAL</th>
                    <th className="p-5 text-left">PAID</th>
                    <th className="p-5 text-left">DELIVERED</th>
                    <th className="p-5 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-5">{order._id.substring(20, 24)}</td>
                      <td className="p-5">
                        {order.user ? order.user.name : "DELETED USER"}
                      </td>
                      <td className="p-5">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-5">&#x20B9;{order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : "not paid"}
                      </td>
                      <td className="p-5">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : "not delivered"}
                      </td>
                      <td className="p-5 flex">
                        {/* <Link href={`/admin/orders/${order._id}`}>
                          <PencilSquareIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
                        </Link> */}
                        <Link className="pl-1" href={`/order/${order._id}`}>
                          <EyeIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
