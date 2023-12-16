import React from "react";
import "./styles.css";

const PostComponent = (props) => {
  return (
    <div className="post-card">
      <div className="post-card-contents">
        <div className="name">
          <i>@{props.username}</i>
        </div>
        <div className="title">{props.title}</div>
        <img src={props.imageUrl}></img>
        <div className="content">{props.content}</div>
        {props.showLikeButton && (
          <>
            {props.login && (
              <>
                {props.likedpostIDs.includes(props.id) ? (
                  <button onClick={() => props.disLikePost(props.id)}>
                    ❤️
                  </button>
                ) : (
                  <button onClick={() => props.likePost(props.id)}>🤍</button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
