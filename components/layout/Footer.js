import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#f6f6f6] px-4 md:px-24 py-8 md:py-12">
      <h1 className="text-xl font-bold pb-8">ChkOut</h1>
      <div className=" grid gap-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col">
          <form className="flex flex-col">
            <h2 className="text-lg font-medium pb-4">Signup for newsletter</h2>
            <input className="rounded-none mb-4" placeholder="name" />
            <input className="rounded-none mb-2" placeholder="email" />
            <button className="primary-button">Submit</button>
          </form>
        </div>
        <div>
          <h2 className="text-lg font-medium pb-4">Location</h2>
          <p className="text-[#9b9b9b]">
            AB Road, Vijay Nagar, Indore, Madhya Pradesh, India.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium pb-4">Find Us</h2>
          <ul>
            <li className="pb-2">
              <p className="text-[#9b9b9b]">Facebook</p>
            </li>
            <li className="pb-2">
              <p className="text-[#9b9b9b]">Instagram</p>
            </li>
            <li className="pb-2">
              <p className="text-[#9b9b9b]">Twitter</p>
            </li>
            <li className="pb-2">
              <p className="text-[#9b9b9b]">Whatsapp</p>
            </li>
            <li className="pb-2">
              <p className="text-[#9b9b9b]">Tumblr</p>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[#838383] pb-4">000-0000-000</p>
          <p className="text-[#838383] pb-4">shop@chkout.com</p>
          <p className="text-[#838383] pb-4">
            &#169;{currentYear} By Ameya Shrivastava
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
