import React, { useContext } from 'react'
import MyContext from '../../context/data/MyContext'

function Testimonial() {
    const context = useContext(MyContext)
    const { mode } = context
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{color: mode === 'dark' ? 'white' : ''}}>What our <span className=' text-blue-500'>customers</span> are saying</h2>
                    <div className=" flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img loading="lazy"  alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://media.istockphoto.com/id/1337911282/vector/man-profile-avatar-silhouette-front-view-of-an-anonymous-male-person-face.jpg?s=612x612&w=0&k=20&c=qBzUSk66rViQiBLvOHeflYR1PCvPm6WuLFJ7MP5J2ek=" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque voluptatum exercitationem id dolorum incidunt eligendi, quasi error, repellat possimus sapiente dignissimos obcaecati fuga in qui, aliquid amet iusto dolores rerum.</p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : 'rgb(217 0 188)'}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Alice</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} 
                                className="text-gray-500">Senior Product Designer</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img loading="lazy"  alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://media.istockphoto.com/id/1337911282/vector/man-profile-avatar-silhouette-front-view-of-an-anonymous-male-person-face.jpg?s=612x612&w=0&k=20&c=qBzUSk66rViQiBLvOHeflYR1PCvPm6WuLFJ7MP5J2ek=" />
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, distinctio cum commodi fuga mollitia tempora dolor debitis! Architecto nobis officiis quae aperiam, quod exercitationem laborum, maiores unde, itaque adipisci consequuntur!</p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : 'rgb(217 0 188)'}}  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">John Doe</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">UI Develeoper</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img loading="lazy"  alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://media.istockphoto.com/id/1337911282/vector/man-profile-avatar-silhouette-front-view-of-an-anonymous-male-person-face.jpg?s=612x612&w=0&k=20&c=qBzUSk66rViQiBLvOHeflYR1PCvPm6WuLFJ7MP5J2ek=" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id ullam fugiat obcaecati modi reprehenderit sed repudiandae, distinctio tempora voluptate nesciunt esse asperiores, totam exercitationem perspiciatis. Rerum quisquam expedita enim voluptatum!</p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : 'rgb(217 0 188)'}}  className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Jane Smith</h2>
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="text-gray-500">CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial