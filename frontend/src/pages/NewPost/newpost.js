import "./styles.css";

import React, { useState } from "react";
import axios from "axios";

import { getUserIDName } from "../../hooks/getuserid.js";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const NewpostPage = () => {
  const { userId, username } = getUserIDName();
  const [cookies, _] = useCookies(["access_token"]);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleNewPost = async (event) => {
    event.preventDefault();
    if (title === "" || imageUrl === "" || content === "") {
      setMsg("Please fill in all fields");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/post/newpost",
          {
            title: title,
            imageUrl: imageUrl,
            content: content,
            postOwnerID: userId,
            postOwnerName: username,
          },
          {
            headers: { auth: cookies.access_token },
          }
        );
        setMsg(response.data.message);
        navigate("/");
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="bdy">
      {userId ? (
        <div className="newpost-container">
          <form onSubmit={handleNewPost} className="form">
            <h3>Create New Post</h3>
            <input
              placeholder="Post title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              placeholder="(Image URL)"
              onChange={(e) => setImageUrl(e.target.value)}
            ></input>
            <input
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
            ></input>
            <button type="submit">Post</button>
            <div className="err-msg">{msg && <>{msg}</>}</div>
          </form>
        </div>
      ) : (
        <div className="nologin">Please Log in to continue</div>
      )}
    </div>
  );
};

export default NewpostPage;
