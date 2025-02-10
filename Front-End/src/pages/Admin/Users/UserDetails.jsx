import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const url = `http://localhost:8080/users/${email}`;
    const getUser = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (token) {
      getUser();
    }
  }, [email]);
  const deleteUser = async (email) => {
    try {
      const url = `http://localhost:8080/users/${email}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("User deleted successfully");
      navigate("/users");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="user-container">
        <div className="user-box">
          {error && <div>{error}</div>}
          {user && (
            <div className="user">
              <div className="profile-box">
                <img src="#" alt="#" />
              </div>
              <div className="name-box">
                <h4>{user.first_name}</h4>
                <h4>{user.last_name}</h4>
              </div>
              <div className="mail-box">
                <h4>{user.email}</h4>
                <h4>+254 {user.phone}</h4>
              </div>
            </div>
          )}
          <div className="delete-btn">
            <button onClick={() => deleteUser(user.email)}>Delete User</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
