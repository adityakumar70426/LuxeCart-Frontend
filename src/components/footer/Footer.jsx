import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../context/data/MyContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    const context = useContext(MyContext);
    const { mode } = context;

    return (
        <footer className={`${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} relative `}>
            {/* Wave SVG Separator */}
            <div className="top-10 left-0 w-full overflow-hidden leading-none" style={{ transform: 'rotate(180deg)' }}>
                <svg
                    className="relative block w-full h-12"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className={`${mode === 'dark' ? 'fill-gray-500' : 'fill-gray-300'}`}
                    ></path>
                </svg>
            </div>

            {/* Main Footer Content */}
            <div className="container px-5 pt-24 pb-12 mx-auto">
                <div className="mt-12 flex flex-wrap justify-between md:text-left text-center">
                    {/* Special Collections Section */}
                    <div className="w-full md:w-1/4 px-4 mb-10 md:mb-0">
                        <h2 className={`font-bold text-xl mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            SPECIAL COLLECTIONS
                        </h2>
                        <nav className="flex flex-col space-y-4">
                            {['New Arrivals', 'Best Sellers', 'Limited Edition'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`cursor-pointer transform hover:translate-x-2 transition-transform duration-200 ease-in-out
                                        ${mode === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Customer Service Section */}
                    <div className="w-full md:w-1/4 px-4 mb-10 md:mb-0">
                        <h2 className={`font-bold text-xl mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            CUSTOMER SERVICE
                        </h2>
                        <nav className="flex flex-col space-y-4">
                            {['Return Policy', 'About', 'Contact Us'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`cursor-pointer transform hover:translate-x-2 transition-transform duration-200 ease-in-out
                                        ${mode === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services Section */}
                    <div className="w-full md:w-1/4 px-4 mb-10 md:mb-0">
                        <h2 className={`font-bold text-xl mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            SERVICES
                        </h2>
                        <nav className="flex flex-col space-y-4">
                            {['Customer Support', 'Privacy', 'Order Tracking'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`cursor-pointer transform hover:translate-x-2 transition-transform duration-200 ease-in-out
                                        ${mode === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full md:w-1/4 px-4">
                        <h2 className={`font-bold text-xl mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            STAY UPDATED
                        </h2>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                            />
                            <button
                                className={`px-4 py-2 rounded transition-colors duration-200 ${
                                    mode === 'dark'
                                        ? 'bg-white text-gray-900 hover:bg-gray-200'
                                        : 'bg-gray-900 text-white hover:bg-gray-700'
                                }`}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'} mt-12 pt-8`}>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Link to="/" className="text-2xl font-bold">
                                <span className={`${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>LuxeCart</span>
                            </Link>
                        </div>

                        <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4 md:mb-0`}>
                            © 2024 LuxeCart. All rights reserved.
                        </p>

                        <div className="flex space-x-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="/#"
                                    className={`transform hover:scale-110 transition-transform duration-200 ${
                                        mode === 'dark'
                                            ? 'text-gray-400 hover:text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
