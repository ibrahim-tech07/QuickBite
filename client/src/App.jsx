import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./components/screens/SignUp.jsx";
import { CartProvider } from "./components/ContextReducer.jsx";
import MyOrder from "./components/MyOrder.jsx";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myOrder" element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
