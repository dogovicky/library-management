import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Users/Users.module.css";

const AddNewUser = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    role: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const addNewUser = (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/users/add-new-user";

    try {
      const response = axios.post(url, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        alert("User added successfully");
      }
      navigate("/users");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <form action="post">
            <h4 className={styles.form_heading}>Add New User (Librarian)</h4>
            <div className={styles.input_box}>
              <input
                type="text"
                name="first_name"
                required
                placeholder="First Name"
                value={user.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="text"
                name="last_name"
                required
                placeholder="Last Name"
                value={user.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="text"
                name="gender"
                required
                placeholder="Gender"
                value={user.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="password"
                name="password"
                required
                placeholder="Default Password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="text"
                name="role"
                required
                placeholder="Role"
                value={user.role}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="submit"
              onClick={addNewUser}
              className={styles.submit_btn}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewUser;
