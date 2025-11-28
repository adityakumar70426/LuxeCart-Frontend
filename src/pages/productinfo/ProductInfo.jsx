import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import MyContext from '../../context/data/MyContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../firebase/firebaseConfig';
import { FaStar, FaRegStar } from 'react-icons/fa';

function ProductInfo() {
    const context = useContext(MyContext);
    const { setLoading, mode } = context;

    const [products, setProducts] = useState('');
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (products) => {
        dispatch(addToCart(products));
        toast.success('Added to cart!');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-900';
    const secondaryTextColor = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';

    return (
        <Layout>
            <section className={`body-font overflow-hidden ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="container px-5 py-10 mx-auto">
                    {products && 
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img loading="lazy" 
                            alt="ecommerce"
                            className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                            src={products.imageUrl}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className={`text-sm title-font tracking-widest ${secondaryTextColor}`}>
                                BRAND NAME
                            </h2>
                            <h1 className={`text-3xl title-font font-medium mb-1 ${textColor}`}>
                                {products.title}
                            </h1>
                            <div className="flex mb-4">
                                <span className={`flex items-center ${secondaryTextColor}`}>
                                    {[...Array(5)].map((_, i) => (
                                        i < 4 ? <FaStar key={i} className="text-indigo-500 w-4 h-4" /> : <FaRegStar key={i} className="text-indigo-500 w-4 h-4" />
                                    ))}
                                    <span className={`ml-3 ${secondaryTextColor}`}>4 Reviews</span>
                                </span>
                            </div>
                            <p className={`leading-relaxed border-b-2 mb-5 pb-5 ${secondaryTextColor}`}>
                                {products.description}
                            </p>
                            <div className="flex">
                                <span className={`title-font font-medium text-2xl ${textColor}`}>
                                    ₹{products.price}
                                </span>
                                <button
                                    onClick={() => addCart(products)}
                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
