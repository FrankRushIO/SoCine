import React, { useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { useParams } from "react-router";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import Wall from "./Wall";

const Profile = () => {
  const { currentUser, likedMovies } = useContext(CurrentUserContext);
  const [profileUser, setProfileUser] = useState("");
  const [profile, setProfileStatus] = useState("");
  const imported = useParams();
  console.log(imported);
  const profileId = Object.values(imported)[0];

  useEffect(() => {
    fetch(`/users/${profileId}`)
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.data === "Not Found") {
          console.log("Not Found");
        } else {
          console.log(data);
          setProfileUser(data.data);
        }
      })
      .catch((err) => {
        // setStatus("error");
      });
  }, [profileId]);

  if (profileUser?.pseudo) {
    console.log(profileUser);
    return (
      <Container>
        <Greeting>{profileUser.pseudo}'s profile</Greeting>
        <UserInfoDiv>
          <Avatar />
          <UserInfo>
            <div>Given Name: {profileUser.givenName}</div>
            <div>Surname : {profileUser.surname}</div>
            <div>Pseudo: {profileUser.pseudo}</div>
            <div>Email: {profileUser.email}</div>
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
        <Wall profileUser={profileUser} />
        <LikedMovieContainer>
          <div>Liked movies : {profileUser.likedMovies.length}</div>
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
