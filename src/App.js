import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Home from "./views/Home.jsx";
import SignUp from "./views/SignUp.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
