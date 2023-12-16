import "./styles.css";
import { useCookies } from "react-cookie";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbar-link">
          ZIPS!
        </Link>
        <Link to="/newpost" className="navbar-link">
          New Post
        </Link>
        <Link to="/likedposts" className="navbar-link">
          Liked Posts
        </Link>
        {!cookies.access_token ? (
          <Link to="/auth" className="navbar-link last-item">
            Login or Register
          </Link>
        ) : (
          <button onClick={logout} className="navbar-link last-item">
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
