import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home.jsx";
import SignUp from "./views/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./views/Login.jsx";
import { UserProvider, useUser } from "./context/UserContext.jsx";
import Dashboard from "./views/User/Dashboard/Index.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Listings from "./views/User/Listings/index.jsx";
import User from "./views/User/User/index.jsx";
import Product from "./views/User/Product/index.jsx";
import MyRental from "./views/User/MyRentals/index.jsx";
import ProductDetails from "./views/ProductDetails/index.jsx";
import UserDetails from "./views/UserDetatils/index.jsx";
import Category from "./views/Category/index.jsx";
import Orders from "./views/User/Orders/index.jsx";
import Profile from "./views/User/Profile/index.jsx";
import Reports from "./views/User/Reports/index.jsx";
import About from "./views/About.jsx";
import Contact from "./views/Contact.jsx";
import Terms from "./views/User/Terms/index.jsx";

const App = () => {
  return (
    <UserProvider>
      <RouteContainer />
    </UserProvider>
  );
};

const RouteContainer = () => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/verifyToken",
          { withCredentials: true }
        );
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth fetch failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary text-white">
        <div className="w-16 h-16 loading loading-spinner"></div>
        <p className="mt-6 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:details" element={<ProductDetails />} />
          <Route path="/details/:userId" element={<UserDetails />} />
          <Route path={`/category/:category`} element={<Category />} />
          <Route path={`/user/:userId`} element={<User />} />
          <Route path={`/product/:productId`} element={<Product />} />

          {/* Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/listings"
            element={
              <ProtectedRoute>
                <Listings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/my-rentals"
            element={
              <ProtectedRoute>
                <MyRental />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/cart"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/terms"
            element={
              <ProtectedRoute>
                <Terms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
