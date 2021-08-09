import React, { useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";

const Profile = () => {
  const { currentUser, likedMovies } = useContext(CurrentUserContext);

  if (currentUser?.pseudo) {
    return (
      <Container>
        <Greeting>{currentUser.pseudo}'s profile</Greeting>
        <UserInfoDiv>
          <Avatar />
          <UserInfo>
            <div>Given Name: {currentUser.givenName}</div>
            <div>Surname : {currentUser.surname}</div>
            <div>Pseudo: {currentUser.pseudo}</div>
            <div>Email: {currentUser.email}</div>
          </UserInfo>
          <Statistics>
            Statistics
            <div>
              <p>Number of liked movies: </p>
              <p>Favorite genre:</p>
              <p>Number of friends:</p>
            </div>
          </Statistics>
        </UserInfoDiv>

        <LikedMovieContainer>
          {/* <div>Liked movies : {currentUser.likedMovies}</div> */}
          {likedMovies.map((movie) => {
            return (
              <LikedMovie>
                <Title>{movie.title}</Title>
                <Poster src={movie.posterPath} alt="Movie Poster" />
                <div>
                  {movie.genre.map((genre, index) => {
                    return <div key={index}>{genre.name} </div>;
                  })}
                </div>
              </LikedMovie>
            );
          })}
        </LikedMovieContainer>
      </Container>
    );
  } else return <div>Loading</div>;
};

const Container = styled.div`
  margin-left: 100px;
`;

const Greeting = styled.h1`
  font-size: 3rem;
`;

const UserInfoDiv = styled.div`
  margin-top: 20px;
  display: flex;
  max-width: 1200px;
`;

const Avatar = styled.div`
  width: 200px;
  height: 300px;
  background-color: purple;
`;

const UserInfo = styled.div`
  padding: 10px;
  width: 500px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  border: 2px solid black;
`;

const Statistics = styled.div`
  padding: 10px;
  margin-left: 20px;
  width: 460px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  border: 2px solid black;
`;

const LikedMovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  align-items: baseline;
  align-content: stretch;
  margin-top: 30px;
`;

const LikedMovie = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  min-height: 450px;
  border: 3px black solid;
`;

const Poster = styled.img`
  max-height: 280px;
  max-width: 200px;
`;

const Title = styled.p`
  max-width: 200px;
  min-height: 40px;
`;

export default Profile;
