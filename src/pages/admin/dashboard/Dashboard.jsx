import React, { useContext } from 'react'
import MyContext from '../../../context/data/MyContext';
import Layout from '../../../components/layout/Layout';
import { FaBoxOpen, FaShoppingCart, FaUserTie, FaStar } from 'react-icons/fa';
import DashboardTab from './DashboardTab';


function Dashboard() {
  const context = useContext(MyContext)
  const stats = [
      { count: "5000+", label: "Total Products", icon: <FaBoxOpen size={50} /> },
      { count: "30000+", label: "Total Orders", icon: <FaShoppingCart size={50} /> },
      { count: "10000+", label: "Total Users", icon: <FaUserTie size={50} /> },
      { count: "25000+", label: "Total Reviews", icon: <FaStar size={50} /> },
  ];

    const { mode} = context
  return (
            <Layout>
                <section className="text-gray-600 body-font mt-12 mb-20">
                    <div className=" px-5 mx-auto mb-10">
                        <div className="flex flex-wrap -m-4 text-center">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                                    <div
                                        className="cursor-pointer border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl hover:scale-105 transition-transform transition-shadow duration-300 "
                                        style={{
                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                            color: mode === 'dark' ? 'white' : '',
                                        }}
                                    >
                                        <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                            {stat.icon}
                                        </div>
                                        <h2
                                            className="title-font font-medium text-3xl text-black fonts1"
                                            style={{ color: mode === 'dark' ? 'white' : '' }}
                                        >
                                            {stat.count}
                                        </h2>
                                        <p
                                            className="text-purple-500 font-bold"
                                            style={{ color: mode === 'dark' ? 'white' : '' }}
                                        >
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <DashboardTab/>
            </Layout>
    
  )
}

export default Dashboard