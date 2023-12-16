import React, { useEffect, useState } from "react";

import { getUserIDName } from "../../hooks/getuserid.js";
import { useCookies } from "react-cookie";
import PostComponent from "../../components/post/post.js";

import axios from "axios";

const LikedPostsPage = () => {
  const [likedposts, setLikedposts] = useState([]);

  const { userId, username } = getUserIDName();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
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
          setLikedposts(posts.data.likedPosts);
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    };

    getLikedPosts();
  }, []);
  return (
    <>
      <div className="bdy">
        {userId ? (
          <>
            <h2>{likedposts.length} Liked posts</h2>
            <div className="post-container">
              {likedposts.map((p) => {
                return (
                  <PostComponent
                    key={p._id}
                    id={p._id}
                    title={p.title}
                    login={userId}
                    userId={p.postOwnerID}
                    username={p.postOwnerName}
                    imageUrl={p.imageUrl}
                    content={p.content}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="nologin">Please Log in to continue</div>
        )}
      </div>
    </>
  );
};

export default LikedPostsPage;
