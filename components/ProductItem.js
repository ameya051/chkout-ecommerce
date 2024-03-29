import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div
      className="overflow-hidden bg-white duration-200 relative cursor-pointer border border-gray-200  shadow-sm 
    hover:shadow-md"
    >
      <Link passHref href={`/product/${product.slug}`}>
        <div className="shadow relative rounded-none w-full pt-[100%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full h-full top-0 left-0 object-cover hover:scale-105 duration-300"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
      </Link>
      <div className="flex flex-col items-start justify-center p-4">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-xl font-semibold text-[#3A3A3A]">
            {product.name}
          </h2>
          <p className="font-medium text-[#898989]">{product.brand}</p>
        </Link>
        <div className="flex flex-row">
          {product.rating}
          <div className="flex text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>
        <p className="text-lg font-semibold text-[#3A3A3A]">
          &#x20B9;{product.price}
        </p>
      </div>
      <div className="absolute flex flex-col items-center justify-center w-full h-full top-0 bottom-0 z-50 opacity-0 duration-300 hover:opacity-100 bg-black/50">
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
        <Link href={`/product/${product.slug}`}>
          <button className="primary-button">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
