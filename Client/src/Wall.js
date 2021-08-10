import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const Wall = ({ profileUser }) => {
  const { currentUser } = useContext(CurrentUserContext);

  // console.log(profileUser);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  // console.log("profile user", profileUser.comments);

  useEffect(() => {
    setComments(profileUser.comments);
  }, [profileUser.comments]);

  const displayComments = () => {
    return comments.length > 0 ? (
      <Comments>
        {comments.map((comment, index) => (
          <div key={index}>{comment.comment}</div>
        ))}
      </Comments>
    ) : (
      <Comments>No comments yet</Comments>
    );
  };

  const handleChangeComment = (ev) => {
    setComment(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (comments && comments.length >= 2) {
      setComments([
        ...comments,
        {
          comment: comment,
          pseudo: currentUser.pseudo,
        },
      ]);
    }

    const newComment = { comment, pseudo: currentUser.pseudo }; //Scott
    console.log(newComment);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    };
    fetch(`/comments/${profileUser._id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments([...comments, { ...data.data }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Wall</h1>
      {currentUser?.pseudo ? (
        <Container>
          {displayComments()}
          <Form onSubmit={handleSubmit}>
            <InputLabel>
              Comment this user's profile :
              <InputField
                type="text"
                onChange={handleChangeComment}
                value={comment}
                required
              />
            </InputLabel>
            <div>
              <InputSubmit type="submit" value="Publish Comment" />
            </div>
          </Form>
        </Container>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

const Container = styled.div`
  width: 1200px;
  height: 500px;
  border: 2px black solid;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Comments = styled.div`
  height: 400px;
  width: 1100px;
  border: 1px solid black;
  margin-top: 20px;
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const InputLabel = styled.label`
  display: block;
  color: black;
`;
const InputField = styled.input`
  height: 30px;
  width: 1100px;
  border: 1px solid black;
  display: block;
`;

const InputSubmit = styled.input`
  margin-top: 5px;
  float: right;
  margin-bottom: 10px;
`;

export default Wall;
