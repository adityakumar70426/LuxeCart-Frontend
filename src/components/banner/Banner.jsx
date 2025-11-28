import React, { useContext } from 'react'
import { FaGem, FaHeadset, FaTag } from 'react-icons/fa'
import MyContext from '../../context/data/MyContext'

function Banner() {
    const context = useContext(MyContext)
    const { mode } = context
    return (
        <div>
            <section className="mb-10 text-gray-600 body-font">
                <div className="container px-5 md:py-5 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-lg hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <FaGem className="text-blue-600 w-12 h-12 mb-3 inline-block" />
                                <h2 className="title-font font-medium text-lg text-gray-900" style={{color: mode === 'dark' ? 'white' : ''}}>High-Quality Products</h2>
                                <p className="leading-relaxed">Our products are crafted with the finest materials to provide the best quality and durability.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-lg hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <FaHeadset className="text-blue-600 w-12 h-12 mb-3 inline-block" />
                                <h2 className="title-font font-medium text-lg text-gray-900" style={{color: mode === 'dark' ? 'white' : ''}}>Customer Care</h2>
                                <p className="leading-relaxed">Our team is available 24/7 to assist you with all your queries and support needs.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-lg hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <FaTag className="text-blue-600 w-12 h-12 mb-3 inline-block" />
                                <h2 className="title-font font-medium text-lg text-gray-900" style={{color: mode === 'dark' ? 'white' : ''}}>Exciting Offers</h2>
                                <p className="leading-relaxed">We provide amazing offers & discounts on our high-quality products.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner
