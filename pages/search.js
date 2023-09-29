import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store/slices/cartSlice";
import axiosInstance from "../utils/axiosInstance.js";
const querystring = require("querystring");

const PAGE_SIZE = 3;

const prices = [
  {
    name: "₹1 to ₹500",
    value: "1-500",
  },
  {
    name: "₹501 to ₹1000",
    value: "501-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function Search(props) {
  const router = useRouter();

  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
    page = 1,
  } = router.query;

  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

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
    <Layout title="search">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <div className="my-3">
            <h2>Categories</h2>
            <select
              className="w-full"
              value={category}
              onChange={categoryHandler}
            >
              <option value="all">All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Brands</h2>
            <select className="w-full" value={brand} onChange={brandHandler}>
              <option value="all">All</option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Prices</h2>
            <select className="w-full" value={price} onChange={priceHandler}>
              <option value="all">All</option>
              {prices &&
                prices.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <h2>Ratings</h2>
            <select className="w-full" value={rating} onChange={ratingHandler}>
              <option value="all">All</option>
              {ratings &&
                ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} star{rating > 1 && "s"} & up
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center">
              {products.length === 0 ? "No" : countProducts} Results
              {query !== "all" && query !== "" && " : " + query}
              {category !== "all" && " : " + category}
              {brand !== "all" && " : " + brand}
              {price !== "all" && " : Price " + price}
              {rating !== "all" && " : Rating " + rating + " & up"}
              &nbsp;
              {(query !== "all" && query !== "") ||
              category !== "all" ||
              brand !== "all" ||
              rating !== "all" ||
              price !== "all" ? (
                <button onClick={() => router.push("/search")}>
                  <XCircleIcon className="h-5 w-5" />
                </button>
              ) : null}
            </div>
            <div>
              Sort by{" "}
              <select value={sort} onChange={sortHandler}>
                <option value="featured">Featured</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Customer Reviews</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3  ">
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
            <ul className="flex">
              {products.length > 0 &&
                [...Array(pages).keys()].map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`default-button m-2 ${
                        page == pageNumber + 1 ? "font-bold" : ""
                      } `}
                      onClick={() => pageHandler(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const queryString = querystring.stringify(query);
  const { data } = await axiosInstance.get(`/api/products/search?${queryString}`);
  const { products, countProducts, page, pages, categories, brands } = data;
  return {
    props: {
      products,
      countProducts,
      page,
      pages,
      categories,
      brands,
    },
  };
}
