import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
// import { SessionProvider, useSession } from "next-auth/react";
// import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      NProgress.done(false);
    });
  }, [Router]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      {/* <SessionProvider session={session}> */}
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
        <ToastContainer position="bottom-right" limit={1} />
      </StoreProvider>
      {/* </SessionProvider> */}
    </>
  );
}

// function Auth({ children, adminOnly }) {
//   const router = useRouter();

//   const { status, data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/unauthorized?message=login required");
//     },
//   });

//   if (status === "loading") {
//     return <h1>Loading...</h1>;
//   }
//   if (adminOnly && !session.user.isAdmin) {
//     router.push("/unauthorized?message=admin login required");
//   }

//   return children;
// }
