import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import MyContext from '../../context/data/MyContext';
import Loader from '../../components/loader/Loader';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Login() {
  const { loading, setLoading } = useContext(MyContext);
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();


  const clearFormValues = () => {
    emailRef.current.value = '';
    passRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = emailRef.current.value;
      const password = passRef.current.value;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const plainUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };

      localStorage.setItem('user', JSON.stringify({ user: plainUser }));
      toast.success("Login Successful");
      clearFormValues();
      navigate('/');
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = result.user;
      const plainUser = {
        uid,
        email,
        name: displayName || '',
      };

      localStorage.setItem('user', JSON.stringify({ user: plainUser }));

      const userDocRef = doc(fireDB, 'users', uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          uid,
          email,
          name: plainUser.name,
          time: Timestamp.now(),
        });
      }

      toast.success("Google Sign-In Successful");
      navigate('/');
    } catch (error) {
      toast.error("Google Sign-In failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <form
        className='bg-gray-700 px-10 py-10 rounded-xl w-full max-w-md'
        onSubmit={handleSubmit}
      >
        <div className="">
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
        </div>
        <div>
          <input
            type="email"
            ref={emailRef}
            className='bg-gray-500 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Email'
            required
          />
        </div>
        <div>
          <input
            type="password"
            ref={passRef}
            className='bg-gray-500 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Password'
            required
            minLength={6}
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button
            type="submit"
            className='bg-blue-600 hover:bg-blue-700 w-full text-white font-bold px-2 py-2 rounded-lg'
          >
            Login
          </button>
        </div>
        <div className='flex justify-center mb-3'>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className='bg-blue-500 hover:bg-blue-600 w-full text-white font-bold px-2 py-2 rounded-lg'
          >
            Sign in with Google
          </button>
        </div>
        <div>
          <p className='text-white text-center mb-4 break-words'>
            Use user1 as dummy account or create your own. For admin credentials see the&nbsp;
            <a
              className='text-blue-500 font-bold break-all'
              
              target="_blank"
              rel="noreferrer"
            >
              README
            </a>.
          </p>
        </div>
        <div>
          <h2 className='text-white text-center'>
            Don't have an account?&nbsp;
            <Link className='text-blue-500 font-bold' to='/signup'>Signup</Link>
          </h2>
        </div>
      </form>
    </div>
  );
}

export default Login;
