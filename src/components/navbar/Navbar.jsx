import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSun } from 'react-icons/fi'
import MyContext from '../../context/data/MyContext'
import { FaMoon } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function Navbar() {

  const context=useContext(MyContext)
  const cartItems=useSelector((state)=>state.cart)
  const { toggleMode, mode } = context

  const [open, setOpen] = useState(false)

  const user=JSON.parse(localStorage.getItem('user'));

  const navigate=useNavigate();

  const handleLogout=()=>{
    const userConfirm=confirm('Are you sure you want to logout?')
    if(!userConfirm)return

    window.localStorage.clear()
    toast.success("Logout Succesful")
    navigate('/login')
  }

  return (
    <div className="bg-white sticky top-0 z-50  "  >
      {/* Mobile menu */}
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setOpen(false)}>
          <TransitionChild
            
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex ">
            <TransitionChild
              
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl " style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28 ">
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                  {!localStorage.getItem('user') && <Link to={'/signup'} className=" font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Signup
                  </Link>}
                  {user && <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>
                  </div>}

                  {/* only visible to admin */}
                  {user?.user?.email==='admin@gmail.com'?<div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Admin
                    </Link>
                  </div>:""}

                  {user && <div className="flow-root">
                    <button onClick={()=>handleLogout()} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </button>
                  </div>}
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img loading="lazy" 
                        className="inline-block w-10 h-10 rounded-full"
                        src="data:image/png;base64,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"
                        alt="Jake" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img loading="lazy" 
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* desktop  */}
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-green-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'dark' ? 'rgb(34, 139, 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? 'rgb(77 83 96)' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(!open)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <FiMenu />

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>LuxeCart</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  {!localStorage.getItem('user')  && <Link to={'/signup'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Signup
                    </Link>}
                  {user && <Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Order
                  </Link>}

                  {/* only visible to admin */}
                  {user?.user?.email==='admin@gmail.com'?<Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Admin
                  </Link> : ""}

                 {user && <button onClick={()=>handleLogout()} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </button>}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img loading="lazy" 
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img loading="lazy" 
                      className="inline-block w-10 h-10 rounded-full"
                      src="data:image/png;base64,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"
                      alt="Jake" />
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<FaMoon size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                  <MdOutlineShoppingCart size={28}/>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}