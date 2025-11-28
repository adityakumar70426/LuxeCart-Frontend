import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyContext from '../../../context/data/MyContext'
import { setDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../../firebase/firebaseConfig';  
import {toast} from 'react-toastify';

function UpdateProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const context=useContext(MyContext)

  const {updateProduct}=context

  // Get the product data passed via state
  const { product } = location.state || {};  // Default to empty if no state is passed

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
  });

  // Pre-fill form with product data if available
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        description: product.description,
      });
    }
  }, [product]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle product update
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    // console.log(product)
    const updatedProduct = {
        ...product,       // Original product data from location.state
        ...formData,      // Merged with updated fields from the form
      };
    await updateProduct(updatedProduct)

    setTimeout(() => {
        navigate("/dashboard")
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 px-10 py-10 my-10 rounded-xl">
          <h1 className="text-center text-white text-xl mb-4 font-bold">Update Product</h1>
          <form onSubmit={handleUpdateProduct}>
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product imageUrl"
              />
            </div>
            <div>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product category"
              />
            </div>
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                cols="30"
                rows="7"
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product Description"
              />
            </div>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 w-full text-black font-bold px-2 py-2 rounded-lg"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
