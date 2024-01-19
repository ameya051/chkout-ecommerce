import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { resetCart } from "../../store/slices/cartSlice";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const router = useRouter();

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a, c) => {
        return a + c.quantity;
      }, 0)
    );
  }, [cart.cartItems]);

  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY && !isOpen) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("cart");
    dispatch(logout());
    dispatch(resetCart());
    router.replace("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <header
      className={`sticky top-0 z-[500] w-full bg-white transition-transform duration-300 ${show}`}
    >
      <nav className="flex h-20 items-center px-4 md:px-24 justify-between">
        {/* <button className="md:hidden" type="button" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button> */}
        <Link href="/">
          <h1 className="text-xl font-semibold mr-2 items-center">ChkOut</h1>
        </Link>
        <ul className="gap-16 flex-row hidden md:flex z-[50]">
          <Link className="hover:underline font-medium" href="/">
            Home
          </Link>
          <Link className="hover:underline font-medium" href="/search">
            Shop
          </Link>
          <Link className="hover:underline font-medium" href="/">
            About
          </Link>
          <Link className="hover:underline font-medium" href="/">
            Contact
          </Link>
        </ul>
        <ul className="flex flex-row gap-8 z-[50]">
          <li className="py-4 hidden sm:block">
            {token ? (
              <Menu as="div" className="relative inline-block z-[50]">
                <Menu.Button as="button" className="flex">
                  <UserIcon className=" pr-1 h-7 w-7  text-gray-900" />
                </Menu.Button>
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
                      <Link className="dropdown-link" href="/admin">
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
              <Menu as="div" className="relative inline-block z-[50]">
                <Menu.Button as="button" className="flex">
                  <UserIcon className=" pr-1 h-7 w-7  text-gray-900" />
                </Menu.Button>
                <Menu.Items
                  as="div"
                  className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg "
                >
                  <Menu.Item>
                    <Link className="dropdown-link" href="/login">
                      <h6>Login</h6>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link className="dropdown-link" href="/register">
                      <h6>Sign Up</h6>
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </li>
          <li className="py-4">
            <button
              onClick={toggleSearch}
              className="inline-flex items-center border-b border-transparent hover:border-gray-300 focus:outline-none"
            >
              <MagnifyingGlassIcon className="w-7 h-7 pr-1" />
            </button>
          </li>
          <li className="py-4">
            <Link className="flex" href="/cart">
              <ShoppingCartIcon className="pr-1 h-7 w-7 text-gray-900" />
              {cartItemsCount > 0 && (
                <sup className=" relative top-0 right-0 flex items-center justify-center w-4 h-4 bg-[#1e293b] rounded-full">
                  <div className="text-xs leading-tight text-white">
                    <p>{cartItemsCount}</p>
                  </div>
                </sup>
              )}
            </Link>
          </li>
        </ul>
        {/* <div className={`${isSearchOpen ? "block" : "hidden"}`}> */}
        <div
          className={`fixed inset-0 z-30 flex justify-center items-center ${
            isSearchOpen ? "block" : "hidden"
          }`}
        >
          <div
            className={`bg-white rounded-none w-full p-6 absolute top-0 ${
              isSearchOpen
                ? "translate-y-20 opacity-1"
                : "-translate-y-20 opacity-0"
            }  duration-150`}
          >
            <form className="flex flex-col" onSubmit={submitHandler}>
              <label htmlFor="search-input" className="sr-only">
                Search
              </label>
              <input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                type="text"
                id="search-input"
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="primary-button">
                Search
              </button>
            </form>
          </div>
        </div>
        {/* </div> */}

        <div
          onClick={toggleMenu}
          className="block sm:hidden z-[1000] cursor-pointer"
        >
          {isOpen ? (
            <XMarkIcon className="md:hidden ml-4 h-6 w-6 text-gray-900" />
          ) : (
            <Bars3Icon className="md:hidden ml-4 h-6 w-6 text-gray-900" />
          )}
        </div>
        {isOpen && (
          <div
            className="w-screen h-screen animate-mobileNav sm:hidden absolute top-0 z-[990] bottom-0 flex justify-start items-center bg-white"
            // className={
            //   isOpen
            //     ? "sm:hidden absolute top-0 z-[990] bottom-0 flex justify-start items-center w-full h-screen bg-white ease-in duration-300"
            //     : "sm:hidden absolute top-0 translate-x-[100%] bottom-0 flex justify-start items-center w-full h-screen bg-white ease-in duration-300"
            // }
          >
            <ul className="w-full mx-4">
              <li
                onClick={toggleMenu}
                className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
              >
                <Link className="w-full" href="/">
                  Home
                </Link>
              </li>
              <li
                onClick={toggleMenu}
                className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
              >
                <Link href="/">Shop</Link>
              </li>
              <li
                onClick={toggleMenu}
                className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
              >
                <Link href="/">About</Link>
              </li>
              <li
                onClick={toggleMenu}
                className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
              >
                <Link href="/">Contact</Link>
              </li>
              {token ? (
                <>
                  <li
                    onClick={toggleMenu}
                    className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
                  >
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li
                    onClick={toggleMenu}
                    className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
                  >
                    <Link href="/order-history">Order History</Link>
                  </li>
                  <li
                    onClick={toggleMenu}
                    className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
                  >
                    <Link href="/admin">Admin Dashboard</Link>
                  </li>
                  <li
                    onClick={toggleMenu}
                    className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
                  >
                    <Link href="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <li
                  onClick={toggleMenu}
                  className="py-2 pl-1 text-xl hover:text-gray-500 border-b border-gray-500"
                >
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
