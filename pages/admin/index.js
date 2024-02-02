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
import { getError } from "../../utils/error";
import Loading from "../../components/Loading.js";
import { useSelector } from "react-redux";

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
        const { data } = await axios.get(`/api/admin`, config);
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
        <div className="flex flex-1 flex-col gap-6 p-2">
          <Link className="border p-6 rounded flex gap-4" href="/admin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-layout-dashboard"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            <p>Dashboard</p>
          </Link>
          <Link className="border p-6 rounded flex gap-4" href="/admin/orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-factory"
            >
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M17 18h1" />
              <path d="M12 18h1" />
              <path d="M7 18h1" />
            </svg>
            <p>Orders</p>
          </Link>
          <Link
            className="border p-6 rounded flex gap-4"
            href="/admin/products"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-gantt-chart"
            >
              <path d="M8 6h10" />
              <path d="M6 12h9" />
              <path d="M11 18h7" />
            </svg>
            <p>Products</p>
          </Link>
          <Link className="border p-6 rounded flex gap-4" href="/admin/users">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Users
          </Link>
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
                    &#x20B9;
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].sales.toFixed(2)
                      : 0}
                  </p>
                  <p>Sales</p>
                  <Link className="hover:underline" href="/admin/orders">
                    View sales
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </p>
                  <p>Orders</p>
                  <Link className="hover:underline" href="/admin/orders">
                    View orders
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    {summary.products && summary.users[0]
                      ? summary.products[0].numProducts
                      : 0}
                  </p>
                  <p>Products</p>
                  <Link className="hover:underline" href="/admin/products">
                    View products
                  </Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </p>
                  <p>Users</p>
                  <Link className="hover:underline" href="/admin/users">
                    View users
                  </Link>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
              <Bar
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
                className="w-max"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
