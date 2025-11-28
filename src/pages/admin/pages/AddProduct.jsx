import React, { useContext } from 'react';
import MyContext from '../../../context/data/MyContext';
import { useRef } from 'react';
import Loader from '../../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const context = useContext(MyContext);
    const { addproduct, loading } = context;
    const navigate = useNavigate();

    const productTitle = useRef();
    const productPrice = useRef();
    const productImageUrl = useRef();
    const productCategory = useRef();
    const productDescription = useRef();

    const categories = ['Food', 'Electronics', 'Clothing', 'Books', 'Beauty']; 

    const handleNewProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            title: productTitle.current.value,
            price: productPrice.current.value,
            imageUrl: productImageUrl.current.value,
            category: productCategory.current.value,
            description: productDescription.current.value,
        };

        await addproduct(newProduct);

        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                {loading && <Loader />}
                <form className="bg-gray-800 px-10 py-10 my-8 rounded-xl" onSubmit={handleNewProduct}>
                    <div className="">
                        <h1 className="text-center text-white text-xl mb-4 font-bold">Add Product</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="title"
                            ref={productTitle}
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product title"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="price"
                            ref={productPrice}
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product price"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="imageurl"
                            ref={productImageUrl}
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product imageUrl"
                            required
                        />
                    </div>
                    <div>
                        <select
                            name="category"
                            ref={productCategory}
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <textarea
                            rows="7"
                            name="Description"
                            ref={productDescription}
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Product Description"
                        ></textarea>
                    </div>
                    <div className="flex justify-center mb-3">
                        <button className="bg-yellow-500 hover:bg-yellow-400 w-full text-black font-bold px-2 py-2 rounded-lg">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
