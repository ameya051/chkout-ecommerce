import Link from "next/link";
import Layout from "../components/layout/Layout";
import ProductItem from "../components/ProductItem";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store/slices/cartSlice";

export default function Home({ allProducts }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch(addCart({ ...product, quantity }));
    toast.success("Product added to the cart");
  };

  return (
    <>
      <Layout title="Home">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="">
            <img src="/images/landingimg.jpg" />
          </div>
          <div className="flex flex-col justify-center items-left">
            <h4 className="font-semibold text-4xl pb-2">Check out in style with</h4>
            <h5 className="font-semibold text-4xl pb-4">ChkOut clothing!</h5>
            <Link href="/search" className="primary-button text-center">
              Shop Now!
            </Link>
          </div>
        </div>
        <h2 className="text-2xl my-4 text-center">Latest Products</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map((product) => {
            return (
              <ProductItem
                key={product.slug}
                product={product}
                addToCartHandler={addToCartHandler}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const config = { "Content-Type": "application/json" };
    const fetchAllProducts = await axios.get("/api/products", config);

    return {
      props: {
        allProducts: fetchAllProducts.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        allProducts: [],
      },
    };
  }
}
