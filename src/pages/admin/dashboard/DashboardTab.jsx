import React, { useContext, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MyContext from '../../../context/data/MyContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillDelete } from 'react-icons/ai';
import { MdModeEditOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

function DashboardTab() {
    const context = useContext(MyContext);
    const { mode, products, deleteProduct, users, orders } = context;

    const navigate = useNavigate();
    const addproduct = () => {
        navigate("/addproduct")
    }

    const handleDeleteProduct = async (product) => {
        const userConfirm = confirm('Are you sure you want to delete product?')
        if (!userConfirm) return

        await deleteProduct(product);

    }

    return (
        <>
            <div className="container mx-auto">
                <div className="container mx-auto">
                    <Tabs defaultIndex={0} className="">
                        <TabList className="md:flex md:space-x-8 grid sm:grid-cols-3 text-center gap-4 md:justify-center mb-16">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-blue-700 border-blue-500 text-blue-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12] ">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-blue-500 bg-[#605d5d12] text-blue-500 hover:shadow-blue-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        {/* Product */}
                        <TabPanel>
                            <div className='px-4 md:px-0 mb-16'>
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={addproduct}
                                        className={`focus:outline-none text-white  shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border ${mode === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'} font-medium rounded-lg text-sm px-5 py-2.5 mb-5 mr-4`}>
                                        <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className={`text-xs ${mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-gray-200'} uppercase border border-gray-600`}
                                            style={{
                                                boxShadow: mode === 'dark' ? 'inset 0 0 8px rgba(255,255,255,0.2)' : 'inset 0 0 8px rgba(0,0,0,0.6)'
                                            }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, index) => {
                                                const { imageUrl, title, price, category, date } = product

                                                return (
                                                    <tr key={index} className={`${mode === 'light' ? 'bg-gray-50 text-black' : 'text-white bg-gray-700'} border-b`} >
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {index + 1}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                            <img loading="lazy"  className='w-16' src={imageUrl} alt="img" />
                                                        </th>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {title}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            ₹{price}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {category}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {date}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className=" flex gap-2">
                                                                <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <Link
                                                                        to="/updateProduct"
                                                                        state={{ product }}
                                                                    >
                                                                        <MdModeEditOutline size={20} />
                                                                    </Link>
                                                                    <button onClick={() => handleDeleteProduct(product)}>
                                                                        <AiFillDelete size={20} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>)
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Order */}
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className='text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                    <thead className={`text-xs ${mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-gray-200'} uppercase border border-gray-600`}
                                        style={{
                                            boxShadow: mode === 'dark' ? 'inset 0 0 8px rgba(255,255,255,0.2)' : 'inset 0 0 8px rgba(0,0,0,0.6)'
                                        }}>
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Payment Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total Price (Includes Shipping Cost)
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {orders.map((order,idx)=>{
                                        const {paymentId,totalAmount,userid,email,date,addressInfo,cartItems}=order;
                                        return(<tr key={idx} className={`${mode === 'light' ? 'bg-gray-50 text-black' : 'text-white bg-gray-700'} border-b`} >
                                            <td className="px-6 py-4">
                                                {paymentId}
                                            </td>
                                            <td className="px-6 py-4">
                                            {cartItems.map((item, idx) => (
                                                            <span key={idx}>
                                                                <div>
                                                                    {item.title}
                                                                    </div>
                                                            </span>
                                                        ))}
                                            </td>
                                            <td className="px-6 py-4">
                                            {cartItems.map((item, idx) => (
                                                            <span key={idx}>
                                                                <div>
                                                                    {item.category}
                                                                    </div>
                                                            </span>
                                                        ))}
                                            </td>
                                            <td className="px-6 py-4">
                                            {cartItems.map((item, idx) => (
                                                            <span key={idx}>
                                                                <div>
                                                                ₹{item.price}
                                                                    </div>
                                                            </span>
                                                        ))}
                                            </td>
                                            <td className="px-6 py-4">
                                            {cartItems.map((item, idx) => (
                                                            <span key={idx}>
                                                                <div>
                                                                {item.quantity}
                                                                    </div>
                                                            </span>
                                                        ))}
                                            </td>
                                            <td className="px-6 py-4">
                                            ₹{totalAmount}
                                            </td>
                                            <td className="px-6 py-4">
                                                {addressInfo.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {addressInfo.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {addressInfo.pincode}
                                            </td>
                                            <td className="px-6 py-4">
                                                {addressInfo.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4">
                                                {email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {date}
                                            </td>
                                        </tr>)})}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        {/* User */}

                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className={`text-xs ${mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-gray-200'} uppercase border border-gray-600`}
                                        style={{
                                            boxShadow: mode === 'dark' ? 'inset 0 0 8px rgba(255,255,255,0.2)' : 'inset 0 0 8px rgba(0,0,0,0.6)'
                                        }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Uid
                                            </th>

                                        </tr>
                                    </thead>


                                    <tbody>
                                        {users.map((user,index)=>{
                                            const {name,email,uid}=user
                                            return(<tr key={index} className={`${mode === 'light' ? 'bg-gray-50 text-black' : 'text-white bg-gray-700'} border-b`} >
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {index+1}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {name}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {email}
                                            </td>
                                            <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {uid}
                                            </td>

                                        </tr>)})}
                                    </tbody>

                                </table>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
export default DashboardTab;