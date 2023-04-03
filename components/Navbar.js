import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { resetCart } from "../store/slices/cartSlice";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const router = useRouter();

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a, c) => {
        return a + c.quantity;
      }, 0)
    );
  }, [cart.cartItems]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    dispatch(logout());
    dispatch(resetCart());
    // router.push("/login");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white">
      <nav className="flex h-20 items-center px-4 md:px-24 justify-between shadow-md">
        <Link className="text-xl font-semibold" href="/">
          ChkOut
        </Link>

        <form
          onSubmit={submitHandler}
          className="mx-auto flex w-full justify-center"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            className="rounded-tr-none rounded-br-none p-1 text-md focus:ring-0"
            placeholder="Search products"
          />
          <button
            className="rounded rounded-tl-none rounded-bl-none bg-slate-800 hover:bg-slate-700 border p-1 text-sm dark:text-black"
            type="submit"
            id="button-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>

        <ul className="hidden sm:flex">
          <li className="py-4">
            <Link href="/cart">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-slate-800 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </li>
          <li className="pl-4 py-4">
            {token ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button>{user?.name.split(" ")[0]}</Menu.Button>
                <Menu.Items
                  as="div"
                  className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg "
                >
                  <Menu.Item>
                    <Link className="dropdown-link" href="/profile">
                      Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link className="dropdown-link" href="/order-history">
                      Order History
                    </Link>
                  </Menu.Item>
                  {user?.isAdmin && (
                    <Menu.Item>
                      <Link className="dropdown-link" href="/admin/dashboard">
                        Admin Dashboard
                      </Link>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <Link
                      className="dropdown-link"
                      href="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link className="pl-4" href="/login">
                Login
              </Link>
            )}
          </li>
        </ul>

        <div
          onClick={toggleMenu}
          className="block sm:hidden z-10 cursor-pointer"
        >
          {isOpen ? (
            <XMarkIcon className="md:hidden ml-4 h-6 w-6 text-gray-900" />
          ) : (
            <Bars3Icon className="md:hidden ml-4 h-6 w-6 text-gray-900" />
          )}
        </div>

        <div
          className={
            isOpen
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={toggleMenu}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={toggleMenu}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/cart">Cart</Link>
            </li>
            <li
              onClick={toggleMenu}
              className="p-4 text-4xl hover:text-gray-500"
            >
              {token ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Items
                    as="div"
                    className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg "
                  >
                    <Menu.Item>
                      <Link className="dropdown-link" href="/profile">
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link className="dropdown-link" href="/order-history">
                        Order History
                      </Link>
                    </Menu.Item>
                    {user.isAdmin && (
                      <Menu.Item>
                        <Link className="dropdown-link" href="/admin/dashboard">
                          Admin Dashboard
                        </Link>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <Link
                        className="dropdown-link"
                        href="#"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="pl-4" href="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
