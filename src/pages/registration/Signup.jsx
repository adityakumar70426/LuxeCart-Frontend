import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import MyContext from '../../context/data/MyContext';
import Loader from '../../components/loader/Loader';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { Timestamp, collection, addDoc } from 'firebase/firestore';  // Import Firestore methods
import { toast } from "react-toastify";

function Signup() {
    const context = useContext(MyContext);
    const { loading, setLoading } = context;

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passRef = useRef('');

    const clearFormValues = () => {
        nameRef.current.value = '';
        emailRef.current.value = '';
        passRef.current.value = '';
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            // Get the values from the refs
            const email = emailRef.current.value;
            const password = passRef.current.value;
            const name = nameRef.current.value;

            // Attempt to create a user with email and password using Firebase Authentication
            const users = await createUserWithEmailAndPassword(auth, email, password);

            // Create a user object to store additional info in Firestore
            const user = {
                name: name,
                uid: users.user.uid,  // Firebase user ID (uid)
                email: users.user.email,  // User's email
                time: Timestamp.now(),  // Current timestamp (Firestore format)
            };

            // Reference to Firestore 'users' collection
            const userRef = collection(fireDB, "users");

            // Add the new user object to the Firestore 'users' collection
            await addDoc(userRef, user);

            // Show success message using a toast notification
            toast.success("Signup Successful");

            // Reset the form fields and stop the loading state
            clearFormValues();
            setLoading(false);
            

        } catch (error) {
            console.log(toast)
            toast.error("Signup failed "+"\n" + error.message)
            console.log(error);  // Log any error that occurs during the signup process
            setLoading(false);  // fStop loading state if an error occurs
        }
    };
    return (
        <div className='flex justify-center items-center h-screen'>
                {loading && <Loader /> }
                <form className='bg-gray-700 px-10 py-10 rounded-xl' onSubmit={handleSubmit}>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input type="text"
                            name='name'
                            ref={nameRef}
                            className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Name'
                            required
                        />
                    </div>
                    <div>
                        <input type="email"
                            name='email'
                            ref={emailRef}
                            className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            ref={passRef}
                            className='bg-gray-500 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                            required
                            minLength={6}
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            type="submit"  // Added type="submit" to trigger the form submission
                            className='bg-blue-600 hover:bg-blue-700 w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>Have an account <Link className='text-blue-500 font-bold' to={'/login'}>Login</Link></h2>
                    </div>
                </form>
            </div>
    );
}

export default Signup;
