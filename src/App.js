import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import SignUp from "./views/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./views/Login.jsx";
import { UserProvider, useUser } from "./context/UserContext.jsx";
import Dashboard from "./views/User/Dashboard/Index.jsx";
import { useEffect } from "react";
import axios from "axios";
import Listings from "./views/User/Listings/index.jsx";
import User from "./views/User/User/index.jsx";
import Product from "./views/User/Product/index.jsx";
import MyRental from "./views/User/MyRentals/index.jsx";
import ProductDetails from "./views/ProductDetails/index.jsx";
import UserDetails from "./views/UserDetatils/index.jsx";
import Category from "./views/Category/index.jsx";

const App = () => {
  return (
    <UserProvider>
      <RouteContainer />
    </UserProvider>
  );
};

const RouteContainer = () => {
  const { setUser, user } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/verifyToken",
      { withCredentials: true }
    );
    if (!response.data.user) {
      setUser(null);
    }
    setUser(response.data.user);
  };

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:details" element={<ProductDetails />} />
          <Route path="/details/:userId" element={<UserDetails />} />
          <Route path={`/category/:category`} element={<Category />} />
          <Route path={`/user/:userId`} element={<User />} />
          <Route path={`/product/:productId`} element={<Product />} />
          <Route
            path="/user/dashboard"
            element={user ? <Dashboard /> : <Login />}
          />
          <Route
            path="/user/listings"
            element={user ? <Listings /> : <Login />}
          />
          <Route
            path="/user/my-rentals"
            element={user ? <MyRental /> : <Login />}
          />
          <Route path="/user/cart" element={user ? <Dashboard /> : <Login />} />
          <Route
            path="/user/orders"
            element={user ? <Dashboard /> : <Login />}
          />
          <Route
            path="/user/profile"
            element={user ? <Dashboard /> : <Login />}
          />
          <Route
            path="/user/payments"
            element={user ? <Dashboard /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
