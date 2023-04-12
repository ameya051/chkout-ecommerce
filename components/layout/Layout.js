import Head from "next/head";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTop";
import Footer from "./Footer";

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
        <main className="container m-auto my-4 md:my-8 px-4 md:px-24">
          {children}
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Layout;
