import React, { useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { useParams } from "react-router";
import { CurrentUserContext } from "./CurrentUserContext";
import styled, { keyframes } from "styled-components";
import Wall from "./Wall";
import Logo1 from "./Logo1.png";
import Logo2 from "./Logo2.png";
import Logo3 from "./Logo3.png";
import Logo4 from "./Logo4.png";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Popcorn from "./popcorn.png";
import {
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,
  fadeIn,
} from "react-animations";

const Profile = () => {
  const { currentUser, likedMovies } = useContext(CurrentUserContext);
  const [profileUser, setProfileUser] = useState("");
  const [profile, setProfileStatus] = useState("");
  const imported = useParams();
  console.log(imported);
  const profileId = Object.values(imported)[0];
  const [genre, setGenre] = useState(undefined);
  const genreArray = [];
  console.log(genre);

  const mostFrequent = (arr, n) => {
    {
      // Sort the array
      arr.sort();

      // find the max frequency using linear
      // traversal
      let max_count = 1,
        res = arr[0];
      let curr_count = 1;

      for (let i = 1; i < n; i++) {
        if (arr[i] == arr[i - 1]) curr_count++;
        else {
          if (curr_count > max_count) {
            max_count = curr_count;
            res = arr[i - 1];
          }
          curr_count = 1;
        }
      }

      // If last element is most frequent
      if (curr_count > max_count) {
        max_count = curr_count;
        res = arr[n - 1];
      }
      return res;
    }
  };

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

  useEffect(() => {
    console.log(profileUser);
    if (profileUser) {
      console.log(profileUser.likedMovies);
      likedMovies.map((movie) => {
        return movie.genre.map((genre) => {
          return genreArray.push(genre.id);
        });
      });
    }
    const Id = mostFrequent(genreArray, genreArray.length);
    setGenre(Id);
  }, [profileUser]);

  if (profileUser?.pseudo) {
    console.log(profileUser);
    console.log(genre);
    return (
      <Container>
        <Greeting>{profileUser.pseudo}'s profile</Greeting>
        <UserInfoDiv>
          <Avatar src={profileUser.avatar} />
          <UserInfo>
            <div>Given Name: {profileUser.givenName}</div>
            <div>Surname : {profileUser.surname}</div>
            <div>Pseudo: {profileUser.pseudo}</div>
            <div>Email: {profileUser.email}</div>
          </UserInfo>
          <Statistics>
            Statistics
            <div>
              <p>Number of liked movies: {profileUser.likedMovies.length} </p>
              <p>Favorite genre: {genre}</p>
              <p>Number of people following: {profileUser?.following.length}</p>
            </div>
          </Statistics>
          <img src={Popcorn} style={{ width: "130px", marginLeft: "30px" }} />
        </UserInfoDiv>
        <Wall profileUser={profileUser} />
        <div
          style={{
            width: "1200px",
            marginTop: "30px",
            fontSize: "30px",
            borderBottom: "2px solid black",
          }}
        >
          {profileUser.pseudo}'s liked movies collection (
          {profileUser.likedMovies.length})
        </div>
        <LikedMovieContainer>
          {likedMovies.map((movie) => {
            {
              console.log(movie);
            }

            return (
              <LikedMovie>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    height: "20px",
                  }}
                  to={`/movie/${movie.id}`}
                >
                  <Title>{movie.title}</Title>
                  <Poster src={movie.posterPath} alt="Movie Poster" />
                  <Genres>
                    {movie.genre.map((genre, index) => {
                      return <div key={index}>{genre.name} </div>;
                    })}
                  </Genres>
                </Link>
              </LikedMovie>
            );
          })}
        </LikedMovieContainer>
      </Container>
    );
  } else return <Loading />;
};

const slideAnimationLeft = keyframes`${slideInLeft}`;
const slideAnimationRight = keyframes`${slideInRight}`;
const slideAnimationUp = keyframes`${slideInUp}`;
const slideAnimationDown = keyframes`${slideInDown}`;
const fadeInAnimation = keyframes`${fadeIn}`;

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

const Avatar = styled.img`
  border-radius: 50%;
  width: 130px;
  animation: 1s ${slideAnimationLeft};
`;

const UserInfo = styled.div`
  padding: 10px;
  width: 520px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: center;
  border: 2px solid black;
  background-color: pink;
  animation: 1s ${slideAnimationLeft};
`;

const Statistics = styled.div`
  padding: 10px;
  margin-left: 20px;
  width: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: center;
  border: 2px solid black;
  background-color: pink;
  animation: 1s ${slideAnimationLeft};
`;

const LikedMovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  min-height: 420px;
  border: 2px white solid;
  border-radius: 15px;
  background-color: #e3667f;
  margin: 5px;
  &:hover {
    opacity: 60%;
  }
`;

const Poster = styled.img`
  max-height: 280px;
  width: 200px;
  border-radius: 10px;
`;

const Genres = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  min-height: 85px;
  flex-direction: column;
  color: white;
  background-color: #c98290;
  border-radius: 10px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  border-bottom: 2px solid white;
  margin-bottom: 5px;
  color: white;
`;

export default Profile;
