import Head from "next/head";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTop";

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
        <main className="container m-auto mt-4 md:mt-8 px-4 md:px-24">{children}</main>
        <footer className="flex h-20 justify-center shadow-inner bg-gray-100">
          <div className="flex justify-center items-center">© 2023, By Ameya Shrivastava</div>
        </footer>
        <ScrollToTopButton/>
      </div>
    </>
  );
};

export default Layout;
