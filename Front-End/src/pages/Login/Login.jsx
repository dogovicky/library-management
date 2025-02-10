import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Login/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  function navigateUser(role) {
    if (role === "ADMIN") {
      navigate("/Home/AdminDashboard");
    } else if (role === "LIBRARIAN") {
      navigate("/Home/LibrarianDashboard");
    } else if (role === "STUDENT") {
      navigate("/Home/StudentDashboard");
    } else {
      navigate("/");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await axios.post(url, loginDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      const { user, token } = response.data;
      login(user, token);

      navigateUser(user.role);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <form action="">
            <h4>Log In</h4>
            <div className={styles.input_box}>
              <input
                type="email"
                placeholder="Your Email Address"
                name="email"
                required
                value={loginDetails.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                required
                value={loginDetails.password}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.check_box}>
              <div className={styles.check}>
                <input type="checkbox" name="remember-me" />
                Remember me
              </div>
              <div>
                <Link>Forgot Password?</Link>
              </div>
            </div>
            <div className={styles.btn_box}>
              <input
                type="submit"
                onClick={handleSubmit}
                className={styles.submit_btn}
              />
            </div>
          </form>
          <div className={styles.signup_box}>
            <h2>Don't have an account?</h2>
            <div className={styles.signup_btn}>
              <button>
                <Link>Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
