import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className="card">
      <Link passHref href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="shadow" />
        {/* <div className=" shadow w-fit h-1/2 relative">
          <Image src={product.image} alt={product.name} style={{objectFit: "contain",}}></Image>
        </div> */}
      </Link>
      <div className="flex flex-col items-center justify-center p-4">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
