import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Movie = () => {
  const imported = useParams();
  const searchInput = Object.values(imported)[0];
  const request = require("request-promise");
  const [movie, setResults] = useState([]);

  const handleSearch = () => {
    return request(
      `https://api.themoviedb.org/3/movie/${searchInput}?api_key=a56759345cdd5a5d3830b778270ea182`
    )
      .then((response) => JSON.parse(response))
      .then((parsedResponse) => {
        console.log(parsedResponse);
        const searchResults = {
          message: parsedResponse,
        };
        return searchResults;
      })
      .catch((err) => {
        return console.log("error");
      });
  };
  // useEffect(() => {
  //   console.log(typeof results);
  // }, [results]);

  handleSearch();

  // useEffect(() => {
  //   console.log(results);
  //   console.log(typeof results);
  // }, [results]);

  if (!movie) return <div>Loading</div>;

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
    </div>
  );
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
