import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = ({ user }) => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span>LOGO</span>
      </div>
      <div className="nav-links">
        {user && user.role === "ADMIN" && (
          <>
            <li>
              <Link to="/Home/AdminDashboard">Admin Panel</Link>
            </li>
            <li>
              <Link to="/users">Manage Users</Link>
            </li>
            <li>
              <Link to="/invoices">Invoices</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
          </>
        )}
        {user && user.role === "LIBRARIAN" && (
          <>
            <li>
              <Link to="/Home/LibrarianDashboard">Home</Link>
            </li>
            <li>
              <Link to="/departments">Departments</Link>
            </li>
            <li>
              <Link to="/invoices">Invoices</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
          </>
        )}
      </div>

      <div className="profile">
        {/* <button onClick={logout}>Logout</button> */}
        <div className="profile-btn">
          <Link>
            <i className="bi bi-bell-fill"></i>
          </Link>
          <Link>
            <i className="bi bi-chat-dots"></i>
          </Link>
          <Link to="/profile">
            <i className="bi bi-person-circle"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
