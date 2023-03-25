import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AppState } from "../utils/Store";
import { Bars3Icon, AiOutlineClose } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { status, data: session } = useSession();

  const { state, dispatch } = AppState();
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

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
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white">
      <nav className="flex h-20 items-center px-4 md:px-24 justify-between shadow-md">
        <Link className="text-xl font-semibold" href="/">
          ChkOut
        </Link>

        <form class="mx-auto flex w-full justify-center">
          <input
            type="search"
            class="rounded-tr-none rounded-br-none p-1 text-md focus:ring-0"
            placeholder="Search products"
          />
          <button
            class="rounded rounded-tl-none rounded-bl-none bg-slate-800 hover:bg-slate-700 border p-1 text-sm dark:text-black"
            type="submit"
            id="button-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              aria-hidden="true"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>

        <ul className="hidden sm:flex">
          <li></li>
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
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button>{session.user.name}</Menu.Button>
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
                  {session.user.isAdmin && (
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
            <AiOutlineClose class="md:hidden ml-4 h-6 w-6 text-gray-900" />
          ) : (
            <Bars3Icon class="md:hidden ml-4 h-6 w-6 text-gray-900" />
          )}
        </div>

        <div
          className={
            isOpen
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
          }
        >
          <ul>
            <li onClick={toggleMenu} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/'>Home</Link>
            </li>
            <li onClick={toggleMenu} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/#gallery'>Gallery</Link>
            </li>
            <li onClick={toggleMenu} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/work'>Work</Link>
            </li>
            <li onClick={toggleMenu} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
