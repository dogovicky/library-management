import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminHome from "./pages/Admin/Home/AdminHome";
import PrivateRoutes from "./components/PrivateRoutes";
import LibrarianHome from "./pages/Librarian/Home/LibrarianHome";
import NavBar from "./components/NavBar";
import ManageUsers from "./pages/Admin/Users/ManageUsers";
import UserDetails from "./pages/Admin/Users/UserDetails";
import AddNewUser from "./pages/Admin/Users/AddNewUser";
import Departments from "./pages/Librarian/Departments/Departments";
import DepartmentBooks from "./pages/Librarian/Departments/DepartmentBooks";
import NewBook from "./pages/Librarian/Departments/NewBook";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);
  return (
    <>
      <Router>
        <Layout user={user} />
      </Router>
    </>
  );
}

function Layout({ user }) {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <NavBar user={user} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Home/AdminDashboard"
          element={<PrivateRoutes allowedRoles={["ADMIN"]} />}
        >
          <Route path="" element={<AdminHome />} />
        </Route>
        <Route
          path="/Home/LibrarianDashboard"
          element={<PrivateRoutes allowedRoles={["LIBRARIAN"]} />}
        >
          <Route path="" element={<LibrarianHome />} />
        </Route>
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/users/:email" element={<UserDetails />} />
        <Route path="/users/add-new-user" element={<AddNewUser />} />
        <Route path="/departments" element={<Departments />} />
        <Route
          path="/departments/:department_id"
          element={<DepartmentBooks />}
        />
        <Route
          path="/departments/:department_id/add-new-book"
          element={<NewBook />}
        />
      </Routes>
    </>
  );
}

export default App;
