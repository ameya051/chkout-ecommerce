import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CreateProductModal = ({ onClose }) => {
  const initState = {
    name: "",
    slug: "",
    category: "",
    image: null,
    price: null,
    brand: "",
    countInStock: 0,
    description: "",
    isFeatured: false,
    featuredImage: null,
  };
  const [formData, setFormData] = useState(initState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const { files } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: files ? files[0] : value,
        featured:
          name === "isFeatured"
            ? value === "true"
              ? true
              : false
            : prevFormData.isFeatured,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-none overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="p-6">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium pb-2">Add New Product</h1>
                <div onClick={() => onClose()}>
                  <XMarkIcon className="ml-4 h-6 w-6 text-gray-900 cursor-pointer" />
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="mb-4 sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="slug"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="countInStock"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Count In Stock
                  </label>
                  <input
                    type="number"
                    id="countInStock"
                    className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="isFeatured"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Featured
                  </label>
                  <select
                    id="isFeatured"
                    name="isFeatured"
                    onChange={handleInputChange}
                    className="w-full rounded-none cursor-pointer"
                  >
                    <option value="">-- Select an option --</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="mb-4">
                  <p className="block text-gray-700 font-medium mb-4">
                    Product Image
                  </p>
                  <label
                    htmlFor="image"
                    className="default-button cursor-pointer"
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    required
                  />
                  {formData.image && (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Product Preview"
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                  )}
                </div>
                <div className="mb-4">
                  <p className="block text-gray-700 font-medium mb-4">
                    Featured Banner
                  </p>
                  <label
                    htmlFor="featuredImage"
                    className="default-button cursor-pointer"
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="featuredImage"
                    name="featuredImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleInputChange}
                    required
                  />
                  {formData.featuredImage && (
                    <img
                      src={URL.createObjectURL(formData.featuredImage)}
                      alt="Product Preview"
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  cols="50"
                  className="form-input rounded-none shadow-sm border-gray-300 block w-full"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                >
                  Enter you text here...
                </textarea>
              </div>

              <div className="mt-4">
                <button type="submit" className="primary-button">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
