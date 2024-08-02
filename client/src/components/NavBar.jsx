import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import Model from "./Model";
import Cart from "./screens/Cart";
import { useCart } from "./ContextReducer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function NavBar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info bg-gradient">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic " to="/">
          QuickBite
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link
                className="nav-link  active fs-5  "
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link  active fs-5  "
                  aria-current="page"
                  to="/myOrder"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex ">
              <Link className="btn bg-white text-info mx-1  " to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-info mx-1  " to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-info mx-1  "
                onClick={() => setCartView(true)}
              >
                <ShoppingCartIcon className="" />
                <Badge pill bg="danger" style={{ top: "-12px" }}>
                  {data.length}
                </Badge>
              </div>
              {cartView ? (
                <Model onClose={() => setCartView(false)}>
                  <Cart></Cart>
                </Model>
              ) : null}
              <div
                className="btn bg-white text-danger mx-1  "
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
