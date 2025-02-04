import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx"; 
import Login from "./components/Login.jsx"; 
import RegistrationForm from "./components/RegistrationForm.jsx";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register"element={<RegistrationForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
