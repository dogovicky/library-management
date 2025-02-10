import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Users/Users.module.css";

const ManageUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const url = "http://localhost:8080/users";
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setError("Unauthorized: Please log in first");
          } else if (error.response.status === 403) {
            setError(
              "Forbidden: You do not have permission to access this resource."
            );
          } else {
            setError("Failed. Please try again later");
          }
        } else {
          console.log("Network error: ", error.message);
        }
      }
    };

    if (token) {
      getUsers();
    }
  }, [token]);
  return (
    <>
      <div className={styles.container}>
        <h4 className={styles.heading}>Active Users</h4>
        <div className={styles.users_list}>
          {error && <div className="error-box">{error}</div>}
          {users &&
            users.map((user) => (
              <Link key={user.email} to={`/users/${user.email}`}>
                <div className={styles.user}>
                  <div className={styles.details}>
                    <h4>
                      {user.first_name} {user.last_name}
                    </h4>
                    <span>{user.email}</span>
                  </div>
                  <div className={styles.btn_box}>
                    <div className={styles.edit_btn}>
                      <i className="bi bi-pencil-square"></i>
                    </div>
                    <div className={styles.delete_btn}>
                      <i className="bi bi-trash-fill"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          <Link to="/users/add-new-user" className={styles.add_btn}>
            <div className="add-user-btn">
              <button>Add Users</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
