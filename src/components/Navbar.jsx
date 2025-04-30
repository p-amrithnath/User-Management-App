import React  from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ hide }) => {
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector((state) => state.profile); 
  console.log("profile:", profile);

  if (hide) {
    return null;
  }

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">
        <span style={{ marginLeft: "10px", color: "white" }}>
          User Management System
        </span>
      </a>
      <div>
        <ul>
          <li>
            <a
              className="nav-link"
              onClick={() =>
                navigate("/employees/details", {
                  state: {
                    employee: profile,
                    edit: false,
                    profile: true,
                    view: false,
                  },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-user"></i> Profile
            </a>
          </li>
          <li>
            <a
              href="/"
              className="nav-link"
              onClick={() => localStorage.clear()}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
