import { useRouter } from "next/router";
import React, { useState } from "react";

const Searchbar = ({ isSearchOpen }) => {
    const router = useRouter();
  const [query, setQuery] = useState();
  console.log(query);
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(query ? `/search/?query=${query}` : "/search");
  };
  return (
    <div
      className={`fixed inset-0 z-30 flex justify-center items-center ${
        isSearchOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`bg-white rounded-none w-full p-6 absolute top-0 ${
          isSearchOpen
            ? "translate-y-20 opacity-1"
            : "-translate-y-20 opacity-0"
        }  duration-150`}
      >
        <form className="flex flex-col" onSubmit={submitHandler}>
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            id="search-input"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="primary-button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
