import "./styles.css";
import axios from "axios";
import { useCookies } from "react-cookie";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="bdy">
      <h2 className="auth-heading">
        Welcome to <i>ZIPS!</i> a new social media app
      </h2>
      <div className="auth-container">
        <div className="auth-element">
          <Register />
        </div>
        <div className="auth-element">
          <Login />
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      if (username === "" && password === "") {
        setMsg("Username, Password is empty");
      } else if (username === "") {
        setMsg("Username is empty");
      } else {
        setMsg("Password is empty");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/register/",
          {
            username: username,
            password: password,
          }
        );
        if (response.data.status === "pass") {
          setRegSuccess(true);
        }
        setMsg(response.data.message);
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
        <div className="err-msg" style={regSuccess ? { color: "green" } : null}>
          {msg && <>{msg}</>}
        </div>
      </form>
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      if (username === "" && password === "") {
        setMsg("Username, Password is empty");
      } else if (username === "") {
        setMsg("Username is empty");
      } else {
        setMsg("Password is empty");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3001/auth/login/", {
          username: username,
          password: password,
        });
        setMsg(response.data.message);
        if (response.data.loggedIn) {
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userId", response.data.userID);
          window.localStorage.setItem("username", response.data.username);
          navigate("/");
        }
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
        <div className="err-msg">{msg && <>{msg}</>}</div>
      </form>
    </div>
  );
};

export default AuthPage;
