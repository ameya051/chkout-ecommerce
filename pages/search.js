import React from "react";
import Layout from "../components/Layout";

const Search = () => {
  return (
    <Layout title="Search Results">
      <div className="grid md:grid-cols-4 md:gap-6">
        <div>
          <div className="my-4">
            <h2 className="text-xl">Categories</h2>
            <select class="w-full">
              <option value="all">All</option>
              <option value="Pants">Pants</option>
              <option value="Shirts">Shirts</option>
              <option value="men">men</option>
              <option value="sample category">sample category</option>
              <option value="shirts">shirts</option>
            </select>
          </div>
          <div class="mb-3">
            <h2>Brands</h2>
            <select class="w-full">
              <option value="all">All</option>
              <option value="Adidas">Adidas</option>
              <option value="Casely">Casely</option>
              <option value="Hemley">Hemley</option>
              <option value="Oliver">Oliver</option>
              <option value="Raymond">Raymond</option>
              <option value="Zara">Zara</option>
              <option value="levis">levis</option>
              <option value="nuevos">nuevos</option>
              <option value="sample brand">sample brand</option>
            </select>
          </div>
          <div class="mb-3">
            <h2>Prices</h2>
            <select class="w-full">
              <option value="all">All</option>
              <option value="1-50">$1 to $50</option>
              <option value="51-200">$51 to $200</option>
              <option value="201-1000">$201 to $1000</option>
            </select>
          </div>
          <div class="mb-3">
            <h2>Ratings</h2>
            <select class="w-full">
              <option value="all">All</option>
              <option value="1">1 star &amp; up</option>
              <option value="2">2 stars &amp; up</option>
              <option value="3">3 stars &amp; up</option>
              <option value="4">4 stars &amp; up</option>
              <option value="5">5 stars &amp; up</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
