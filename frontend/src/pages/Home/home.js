import "./styles.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { getUserIDName } from "../../hooks/getuserid.js";
import { useCookies } from "react-cookie";
import PostComponent from "../../components/post/post.js";

const HomePage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [likedpostIDs, setLikedpostIDs] = useState([]);

  const { userId, username } = getUserIDName();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await axios.get("http://localhost:3001/post");
        setAllPosts(posts.data);
        // console.log(posts.data);
      } catch (err) {
        console.log(err);
        alert("something went wrong");
      }
    };

    const getLikedPosts = async () => {
      try {
        const posts = await axios.post(
          `http://localhost:3001/post/likedposts/${userId}`,
          {},
          {
            headers: { auth: cookies.access_token },
          }
        );
        if (posts.data.loggedIn) {
          setLikedpostIDs([
            ...likedpostIDs,
            ...posts.data.likedPosts.map((p) => p._id),
          ]);
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    };

    getPosts();
    getLikedPosts();
  }, []);

  const likePost = async (postId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/post/likepost",
        {
          userId: userId,
          postId: postId,
        },
        {
          headers: { auth: cookies.access_token },
        }
      );
      setLikedpostIDs([...likedpostIDs, response.data.postId]);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const disLikePost = async (postId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/post/dislikepost",
        {
          userId: userId,
          postId: postId,
        },
        {
          headers: { auth: cookies.access_token },
        }
      );
      setLikedpostIDs(likedpostIDs.filter((id) => id !== response.data.postId));
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bdy">
      <h2>
        <i>
          Welcome to ZIPS!, {userId ? <>{username}</> : <>{"Random User"}</>}
        </i>
      </h2>
      <div className="post-container">
        {allPosts.map((p) => {
          return (
            <PostComponent
              key={p._id}
              id={p._id}
              title={p.title}
              userId={p.postOwnerID}
              login={userId}
              username={p.postOwnerName}
              imageUrl={p.imageUrl}
              content={p.content}
              showLikeButton={true}
              likedpostIDs={likedpostIDs}
              disLikePost={disLikePost}
              likePost={likePost}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
