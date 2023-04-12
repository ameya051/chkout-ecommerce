/* eslint-disable no-unused-vars */
import axios from "../../utils/axiosInstance.js";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "../../components/layout/Layout.js";
import {getError} from "../../utils/error";
import Loading from "../../components/Loading.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function Dashboard() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: false,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => {
      return x._id;
    }),
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5 max-w-full">
        <div>
          <ul className="mt-4">
            <li className="text-grey-900 transition-all duration-300 ease-in-out mb-12">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                href="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="text-grey-900 transition-all duration-300 ease-in-out mb-12">
              <Link
                className="bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
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
        <div className="md:col-span-3 max-w-full">
          <h1 className="mb-4 text-2xl">Admin Dashboard</h1>
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    $
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].sales.toFixed(2)
                      : 0}
                  </p>
                  <p>Sales</p>
                  <Link className="hover:underline" href="/admin/orders">View sales</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </p>
                  <p>Orders</p>
                  <Link className="hover:underline" href="/admin/orders">View orders</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    {summary.products && summary.users[0]
                      ? summary.products[0].numProducts
                      : 0}
                  </p>
                  <p>Products</p>
                  <Link className="hover:underline" href="/admin/products">View products</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </p>
                  <p>Users</p>
                  <Link className="hover:underline" href="/admin/users">View users</Link>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
              <Bar
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
