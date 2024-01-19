import React, { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/Layout";
import Loading from "../../../components/Loading.js";
import CreateProductModal from "../../../components/modals/CreateProductModal";
import { getError } from "../../../utils/error";
import axiosInstance from "../../../utils/axiosInstance.js";
import { useSelector } from "react-redux";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
        successCreate: true,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [
    {
      loading,
      error,
      products,
      loadingCreate,
      successCreate,
      successDelete,
      loadingDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const { token } = useSelector((state) => state.auth);

  const createHandler = async (formData) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      setIsModalOpen(false);
      dispatch({ type: "CREATE_REQUEST" });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axiosInstance.post(`/api/admin/products`, formData, config);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosInstance.get(`/api/admin/products`,config);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else if (successCreate === true) {
      fetchData();
    } else {
      fetchData();
    }
  }, [successDelete, successCreate]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axiosInstance.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Admin Products">
      <div className="grid md:grid-cols-4 md:gap-5">
        {isModalOpen && (
          <CreateProductModal
            onSubmit={createHandler}
            onClose={() => setIsModalOpen(false)}
          />
        )}
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
                className="font-semibold bg-left-bottom bg-gradient-to-r from-gray-900 to-gray-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
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
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Products</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={() => setIsModalOpen(true)}
              className="primary-button"
            >
              {loadingCreate ? "Loading" : "Add New Product"}
            </button>
          </div>
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
                    <th className="p-5 text-left">NAME</th>
                    <th className="p-5 text-left">PRICE</th>
                    <th className="p-5 text-left">CATEGORY</th>
                    <th className="p-5 text-left">COUNT</th>
                    <th className="p-5 text-left">RATING</th>
                    <th className="p-5 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className=" p-5 ">{product._id.substring(20, 24)}</td>
                      <td className=" p-5 ">{product.name}</td>
                      <td className=" p-5 ">${product.price}</td>
                      <td className=" p-5 ">{product.category}</td>
                      <td className=" p-5 ">{product.countInStock}</td>
                      <td className=" p-5 ">{product.rating}</td>
                      <td className=" p-5 flex">
                        <Link href={`/admin/products/${product._id}`}>
                          <PencilSquareIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
                        </Link>
                        &nbsp;
                        <button onClick={() => deleteHandler(product._id)}>
                          <XMarkIcon className="h-7 w-7 cursor-pointer" />
                        </button>
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
