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
    router.replace("/login");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <header className={`sticky top-0 z-30 w-full bg-white transition-transform duration-300 ${show}`}>
      <nav className="flex h-20 items-center px-4 md:px-24 justify-between">
        <button
          onClick={toggleSearch}
          className="inline-flex items-center border-b border-transparent hover:border-gray-300 focus:outline-none"
        >
          <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
          <span className="text-gray-500">Search...</span>
        </button>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-none w-full p-6 absolute top-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Search</h2>
                <button onClick={toggleSearch}>
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
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
        )}

        <Link href="/">
          <h1 className="text-xl font-semibold mr-2 items-center">ChkOut</h1>
        </Link>

        <ul className="flex flex-row">
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
          <li className="pl-4 py-4">
            {token ? (
              <Menu as="div" className="relative inline-block">
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
              <Link className="hover:underline" href="/login">
                <h6>Login</h6>
              </Link>
            )}
          </li>
        </ul>

        {/* <div
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
            {token ? (
              <>
                <li
                  onClick={toggleMenu}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="/profile">Profile</Link>
                </li>
                <li
                  onClick={toggleMenu}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="/order-history">Order History</Link>
                </li>
                <li
                  onClick={toggleMenu}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="/admin">Admin Dashboard</Link>
                </li>
                <li
                  onClick={toggleMenu}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li
                onClick={toggleMenu}
                className="p-4 text-4xl hover:text-gray-500"
              >
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div> */}
      </nav>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
