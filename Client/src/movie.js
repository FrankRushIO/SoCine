import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Recommendations from "./recommendation";

const Movie = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const imported = useParams();
  console.log(imported);
  const searchInput = Object.values(imported)[0];
  console.log(searchInput);
  const request = require("request-promise");
  const [movie, setMovie] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  console.log(currentUser);

  const handleSearch = () => {
    return request(
      `https://api.themoviedb.org/3/movie/${searchInput}?api_key=a56759345cdd5a5d3830b778270ea182`
    )
      .then((response) => JSON.parse(response))
      .then((parsedResponse) => {
        const searchResults = {
          message: parsedResponse,
        };
        setMovie(parsedResponse);
        return searchResults;
      })
      .catch((err) => {
        return console.log("error");
      });
  };

  const handleClickLike = () => {
    let type = "";
    console.log(currentUser._id);
    if (isLiked) {
      const index = currentUser.likedMovies.indexOf(searchInput);
      console.log(index);
      currentUser.likedMovies.splice(index, 1);
      console.log(currentUser.likedMovies);
      type = "unlike";
    } else {
      currentUser.likedMovies.push(searchInput);
      type = "like";
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchInput, type }),
    };
    fetch(`/user/${currentUser._id}`, requestOptions)
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        // setCurrentUser(data);
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleSearch();
    console.log(currentUser);
    if (currentUser) {
      console.log("hey");
      verifyLike();
    }
  }, [currentUser, imported]);

  const verifyLike = () => {
    console.log(currentUser);
    if (currentUser?.likedMovies === []) {
      setIsLiked(false);
    } else {
      const likedMovies = currentUser.likedMovies;
      likedMovies.forEach((movie) => {
        if (movie === searchInput) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      });
    }
  };

  if (!movie) return <div>Loading</div>;
  else {
    return (
      <div>
        <MovieContainer>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              alt="Movie poster"
            />
          </div>
          <div>
            <Link to={`/movie/${movie.id}`}>
              <Title>{movie.title}</Title>
            </Link>

            <Overview>{movie.overview}</Overview>
          </div>
        </MovieContainer>
        <button onClick={handleClickLike}>
          {!isLiked ? "Like " : "Unlike "}
          movie
        </button>
        <div>
          <Recommendations id={searchInput} />
        </div>
      </div>
    );
  }
};

const MovieContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const Title = styled.p`
  max-width: 300px;
`;

const Overview = styled.p`
  max-width: 300px;
`;

export default Movie;
