import React, { useState, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import Loading from "./Loading";
import {
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,
  fadeIn,
} from "react-animations";

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
          <CommentWrapper>
            <Pseudo key={index + 1000}>{comment.pseudo} </Pseudo>
            <Comment key={index}>{comment.comment}</Comment>
          </CommentWrapper>
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
    <WallContainer>
      {currentUser?.pseudo ? (
        <Container
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
          }}
        >
          <Title>{currentUser.pseudo}'s Wall</Title>
          {displayComments()}
          <Form onSubmit={handleSubmit}>
            <InputLabel>
              Comment on {profileUser.pseudo}'s wall (100 characters limit)
              <InputField
                type="text"
                onChange={handleChangeComment}
                value={comment}
                maxLength="100"
                required
              />
            </InputLabel>
            <div>
              <InputSubmit type="submit" value="Publish Comment" />
            </div>
          </Form>
        </Container>
      ) : (
        <Loading />
      )}
    </WallContainer>
  );
};

const fadeInAnimation = keyframes`${fadeIn}`;

const WallContainer = styled.div`
  margin-top: 20px;
  animation: 2s ${fadeInAnimation};
`;

const Container = styled.div`
  border-radius: 15px;
  width: 1200px;
  height: 400px;
  border: 2px black solid;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  float: left;
  width: 1100px;
  margin-top: 10px;
  font-size: 23px;
`;

const Comments = styled.div`
  padding: 10px;
  height: 400px;
  width: 1100px;
  border: 1px solid black;
  margin-top: 10px;
  color: black;
  background-color: white;
  border-radius: 10px;
`;

const CommentWrapper = styled.div`
  margin-top: 10px;
  font-size: 15px;
  min-height: 25px;
  border-bottom: 1px solid black;
`;

const Pseudo = styled.span``;
const Comment = styled.span`
  background-color: #ffcccb;
  border-radius: 4px;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  max-width: 300px;
  border: 1px solid black;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const InputLabel = styled.label`
  display: block;
  color: black;
  border-radius: 5px;
`;
const InputField = styled.input`
  height: 30px;
  width: 1100px;
  border: 1px solid black;
  display: block;
  border-radius: 5px;
`;

const InputSubmit = styled.input`
  margin-top: 5px;
  float: right;
  margin-bottom: 10px;
`;

export default Wall;
