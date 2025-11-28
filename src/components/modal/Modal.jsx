import React, { useState, useRef, Fragment, useContext } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild, DialogTitle } from '@headlessui/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import MyContext from '../../context/data/MyContext';
import { fireDB } from "../../firebase/firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

const Modal = ({ totalAmount, cartItems }) => {
    const { mode } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nameRef = useRef('');
    const addressRef = useRef('');
    const pincodeRef = useRef('');
    const phoneNumberRef = useRef('');

    const stripe = useStripe();
    const elements = useElements();

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const name = nameRef.current.value.trim();
        const address = addressRef.current.value.trim();
        const pincode = pincodeRef.current.value.trim();
        const phoneNumber = phoneNumberRef.current.value.trim();

        try {
            const response = await fetch('https://chiccart-backend.onrender.com/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: (totalAmount + 100) * 100 })
            });

            const data = await response.json();
            const cardElement = elements.getElement(CardElement);

            const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name,
                        address: { line1: address, postal_code: pincode },
                    },
                },
            });

            console.log("Payment Result:", paymentResult);

            if (paymentResult.error) {
                setErrorMessage(paymentResult.error.message);
                return;
            }

            const paymentIntent = paymentResult?.paymentIntent;

            if (!paymentIntent || paymentIntent.status !== 'succeeded') {
                setErrorMessage('Payment was not successful. Please try again.');
                return;
            }

            const paymentId = paymentIntent.id;

            const orderInfo = {
                cartItems,
                totalAmount: totalAmount + 100,
                addressInfo: { name, address, pincode, phoneNumber },
                date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                email: JSON.parse(localStorage.getItem('user'))?.user?.email,
                userid: JSON.parse(localStorage.getItem('user'))?.user?.uid,
                paymentId,
            };

            try {
                await addDoc(collection(fireDB, 'orders'), orderInfo);
                dispatch(clearCart())
                toast.success('Payment successful!');
                closeModal();
                navigate('/');
            } catch (error) {
                console.error('Error saving order:', error);
                toast.error('Could not save order — please try again.');
            }

        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong during payment.');
        }
    };

    return (
        <>
            <button disabled={cartItems.length === 0} onClick={openModal} className="hover:bg-violet-700 bg-violet-600 text-white py-2 px-4 rounded-lg">
                Buy Now
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel className={`w-full max-w-lg rounded-2xl p-6 ${mode === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
                                <DialogTitle as="h2" className="text-xl font-semibold">Complete Payment</DialogTitle>
                                <form onSubmit={handlePayment} className="space-y-6 mt-4">
                                    <input ref={nameRef} className="w-full border rounded-lg p-2" placeholder="Full Name" required />
                                    <input ref={addressRef} className="w-full border rounded-lg p-2" placeholder="Address" required />
                                    <input ref={pincodeRef} className="w-full border rounded-lg p-2" placeholder="Pincode" required />
                                    <input ref={phoneNumberRef} className="w-full border rounded-lg p-2" placeholder="Phone Number" required />
                                    <CardElement className="border p-3 rounded-lg" />
                                    <button type="submit" disabled={!stripe} className="bg-violet-600 text-white px-4 py-2 rounded-lg">Pay</button>
                                </form>
                                <div className="text-sm mt-4">To complete payment view <a className="font-bold" href="https://github.com/Jitesh7891/e-commerce">README file</a></div>
                                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
