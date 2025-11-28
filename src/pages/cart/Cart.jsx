import React, { useContext, useReducer } from 'react'
import MyContext from '../../context/data/MyContext';
import Layout from '../../components/layout/Layout';
import { RiAddLine, RiSubtractLine, RiDeleteBinLine } from "react-icons/ri";
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, incrementQuantity, decrementQuantity } from '../../redux/cartSlice';
import { toast } from 'react-toastify';


function Cart() {

  const context = useContext(MyContext);
  const dispatch = useDispatch();

  const { mode } = context;
  const cartItems = useSelector((state) => state.cart);
  const totalAmount = cartItems.reduce((total, cartItem) => total + cartItem.quantity * parseInt(cartItem.price), 0);

  const deleteCart = (item) => {
    toast.success("Item removed from cart", {
      autoClose: 800
    });
    dispatch(deleteFromCart(item));
  }

  return (
    <Layout >
      <div className="bg-gray-100 pt-5 mb-10 pb-6 " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">


            {cartItems.map((item, index) => {
              const { id, title, price, description, imageUrl, quantity } = item;
              return (
                <div
                  key={index}
                  className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                >
                  <img loading="lazy"  src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                      <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Quantity: {quantity}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        ₹{price} x {quantity} = ₹{price * quantity}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                         disabled={quantity==1}
                          onClick={() => dispatch(decrementQuantity(id))}
                          className="p-1 bg-red-400 hover:bg-red-500 rounded-full"
                        >
                          <RiSubtractLine size={20} />
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(id))}
                          className="p-1 bg-green-400 hover:bg-green-500 rounded-full"
                        >
                          <RiAddLine size={20} />
                        </button>
                      </div>
                    </div>
                    <div
                      onClick={() => deleteCart(item)}
                      className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                    >
                      <RiDeleteBinLine size={23} className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              );
            })}


          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{100}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount + 100}</p>
              </div>
            </div>
            {localStorage.getItem('cart') ? <Modal totalAmount={totalAmount} cartItems={cartItems} /> : <div>No items added to cart</div>}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart