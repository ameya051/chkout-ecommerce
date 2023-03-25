import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AppState } from "../utils/Store";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - ChkOut" : "ChkOut"}</title>
        <meta name="description" content="Developed by Ameya Shrivastava" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="container m-auto mt-8 px-4 md:px-24">{children}</main>
        <footer className="flex h-20 justify-center shadow-inner bg-gray-100">
          <div className="flex justify-center items-center">© 2023, By Ameya Shrivastava</div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
