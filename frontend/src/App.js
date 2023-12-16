import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/navbar.js";

import HomePage from "./pages/Home/home.js";
import AuthPage from "./pages/Auth/auth.js";
import NewpostPage from "./pages/NewPost/newpost.js";
import LikedPostsPage from "./pages/LikedPosts/likedposts.js";

import "./styles.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/newpost" element={<NewpostPage />} />
          <Route path="/likedposts" element={<LikedPostsPage />} />
          <Route path="/*" element={<InvalidUrl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const InvalidUrl = () => {
  return <div className="nologin">Invalid URL</div>;
};

export default App;
