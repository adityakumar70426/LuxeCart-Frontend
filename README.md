# LuxeCart
*Your chic shopping destination for modern e-commerce.*

---

## Description
LuxeCart is a full-stack e-commerce platform that delivers a complete online shopping experience. Users can browse products, add items to cart, and make secure payments using Stripe integration. The platform features a comprehensive admin dashboard for managing products, orders, and users. Built with React and Firebase, LuxeCart combines modern web technologies to create a seamless shopping experience.

---

## Demo
[Live Demo](https://chiccart.onrender.com/)

---

## Features
- Product Browsing – Explore a wide range of products with detailed views
- Shopping Cart – Add, remove, and manage items in your cart
- Secure Payments – Complete purchases using Stripe payment integration
- User Authentication – Sign up and sign in with Firebase authentication
- Product Filtering – Filter products by category and price range
- Product Search – Find specific products quickly with search functionality
- Order Management – View order summary and track past purchases
- Admin Dashboard – Comprehensive admin panel for business management
- Product Management – Add, edit, and delete products (Admin only)
- Order Tracking – View and manage all customer orders (Admin only)
- User Management – Monitor user accounts and activity (Admin only)

---

## Installation

### Frontend Setup
```bash
git clone https://github.com/Jitesh7891/LuxeCart.git
cd LuxeCart
npm install
npm run dev
```

### Backend Setup
```bash
git clone https://github.com/Jitesh7891/LuxeCart-backend.git
cd LuxeCart-backend
npm install
npm start
```

**Note:** Both frontend and backend need to be running simultaneously for full functionality.  
**Note:** Make a .env file in backend and add your stripe secret key like this STRIPE_SECRET_KEY=YOUR_KEY_HERE

## Technologies Used
- **React** – Frontend framework built with Vite for fast development
- **Firebase** – Authentication and real-time database services
- **Express.js** – Backend API framework
- **Node.js** – Server-side JavaScript runtime
- **Stripe** – Secure payment processing integration
- **Tailwind CSS** – Utility-first CSS framework for styling
- **React-Toastify** – Toast notifications for user feedback
- **Redux** – State management for complex application state

## Folder Structure
`public/` - Static assets and HTML template

`src/` - React application source code

`src/components/` - Reusable UI components and layouts

`src/context/` - React context providers for global state

`src/firebase/` - Firebase configuration and services

`src/pages/` - Main application pages and routes

`src/redux/` - Redux store, actions, and reducers for state management

---

##  Usage Instructions
1. **Sign In** – Create a new account or use the dummy account provided
2. **Browse Products** – Explore the home page to see available products and click on them for detailed information
3. **Shop & Cart** – Add products to cart and proceed to checkout
4. **Make Payment** – Complete purchase using the test Stripe credentials
5. **View Order** – View summary of all order on Order page
6. **Admin Access** – Use admin credentials to access the management dashboard


**Test Payment Details:**  
Card Number: `4242 4242 4242 4242`  
Expiry: *Any future date*  
CVV: *Any 3-digit number*

---

## Repositories
- **Frontend:** [LuxeCart Frontend](https://github.com/Jitesh7891/chiccart)
- **Backend:** [LuxeCart Backend](https://github.com/Jitesh7891/LuxeCart-backend)

Feel free to clone and explore both repositories to see modern e-commerce capabilities in action.
