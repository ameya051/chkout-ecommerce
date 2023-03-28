import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import db from "../utils/db";
import Product from "../models/Product";
import { toast } from "react-toastify";
import { AppState } from "../utils/Store";
import axios from "axios";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = AppState();
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };

  return (
    <>
      <Layout title="Home">
        <Carousel
          showStatus={false}
          infiniteLoop
          showArrows={false}
          showThumbs={false}
          autoPlay
        >
          {featuredProducts.map((product) => (
            <div key={product._id}>
              <Link href={`/product/${product.slug}`} className="flex" passHref>
                <div className="h-[12rem] md:h-[20rem]">
                  <Image src={product.featuredImage} alt={product.name} fill></Image>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
        <h2 className="text-2xl my-4 text-center">Latest Products</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
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
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
