import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MyState from './context/data/MyState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Suspense, lazy } from 'react';
import Loader from './components/loader/Loader';
import Home from './pages/home/Home'

// Lazy load pages
const Cart = lazy(() => import('./pages/cart/Cart'));
const Dashboard = lazy(() => import('./pages/admin/dashboard/Dashboard'));
const Order = lazy(() => import('./pages/order/Order'));
const Nopage = lazy(() => import('./pages/nopage/Nopage'));
const Login = lazy(() => import('./pages/registration/Login'));
const Signup = lazy(() => import('./pages/registration/Signup'));
const ProductInfo = lazy(() => import('./pages/productinfo/ProductInfo'));
const AddProduct = lazy(() => import('./pages/admin/pages/AddProduct'));
const UpdateProduct = lazy(() => import('./pages/admin/pages/UpdateProduct'));


function App() {
  const stripePromise = loadStripe('pk_test_51QXk2AGBh6dS5l43Wq8dgJIfQfi1GCgbtlEMHbKb6uzNTP1x0uj2VF4b0cO9BnFt3yCMyFoNv8jiWVzX2GXw8isA00jzywgO6t');

  return (
    <MyState>
      <Elements stripe={stripePromise}>
        <Router>
          <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="/productinfo/:id" element={<ProductInfo />} />
              <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>} />
              <Route path="/productinfo" element={<ProductInfo />} />
              <Route path="/login" element={<OnlyNonLoggedInRoute><Login /></OnlyNonLoggedInRoute>} />
              <Route path="/signup" element={<OnlyNonLoggedInRoute><Signup /></OnlyNonLoggedInRoute>} />
              <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>} />
              <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>} />
              <Route path="/*" element={<Nopage />} />
            </Routes>
          </Suspense>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </Router>
      </Elements>
    </MyState>
  );
}

export default App;

// Auth and Role-Based Route Components
export const OnlyNonLoggedInRoute = ({ children }) => {
  return localStorage.getItem('user') ? <Navigate to="/" /> : children;
};

export const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

export const ProtectedRouteForAdmin = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  return currentUser && currentUser.user.email === 'admin@gmail.com'
    ? children
    : <Navigate to="/" />;
};
