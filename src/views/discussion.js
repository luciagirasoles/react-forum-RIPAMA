/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

function Discussion({ comments, id, user, setComments, title }) {
  const commentStyle = {
    border: "1px solid red",
    paddingLeft: "8px"
  };

  const discussionStyle = {
    border: "1px solid blue"
  };

  const [commentContent, setCommentContent] = React.useState("");

  function handleChangeComment(event) {
    setCommentContent(event.target.value);
  }

  function addComment(newComment, idParent) {
    const currentComments = { ...comments };
    currentComments[idParent]["comments"].push(newComment.id);
    const updateComments = {
      ...currentComments,
      [newComment.id]: newComment
    };
    setComments(updateComments);
    localStorage.setItem("comments", JSON.stringify(updateComments));
  }

  function handleNewComment(event) {
    event.preventDefault();
    const currentId = event.target.dataset.id;
    const newId = Date.now();
    const newComment = {
      id: newId,
      parent: currentId,
      body: commentContent,
      author: user.username,
      date: newId,
      comments: []
    };
    addComment(newComment, currentId);
  }

  function renderChildren(idComment) {
    let currentComment = comments[idComment];

    return (
      <>
        {currentComment.parent ? (
          <>
            <div key={idComment} css={commentStyle}>
              <span>{comments[idComment]["body"]}</span>
              <form onSubmit={handleNewComment} data-id={idComment}>
                <input
                  placeholder="Write a comment"
                  name="new-comment"
                  onChange={handleChangeComment}
                />
                <button>Create comment</button>
              </form>
              {comments[idComment]["comments"].map(currenId => {
                return renderChildren(currenId);
              })}
            </div>
          </>
        ) : (
          <>
            <div key={idComment} css={discussionStyle}>
              <h1>{title}</h1>
              <div>
                <span>By {currentComment.author} | </span>
                <span>date: {currentComment.date}</span>
              </div>
              <p>{currentComment.body}</p>
              <form onSubmit={handleNewComment} data-id={idComment}>
                <input
                  placeholder="Write a comment"
                  name="new-comment"
                  onChange={handleChangeComment}
                />
                <button>Create comment</button>
              </form>
              {comments[idComment]["comments"].map(currenId => {
                return renderChildren(currenId);
              })}
            </div>
          </>
        )}
      </>
    );
  }

  return <article>{renderChildren(id)}</article>;
}

export default Discussion;
