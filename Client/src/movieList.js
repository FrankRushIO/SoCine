import React, { useState, useContext } from "react";
import { useParams } from "react-router";
// import { SearchBar } from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import Loading from "./Loading";

const MovieList = () => {
  const imported = useParams();
  const searchInput = Object.values(imported)[0];
  const request = require("request-promise");
  const [results, setResults] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  const handleSearch = () => {
    return request(
      `https://api.themoviedb.org/3/search/movie?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&query=${searchInput}&page=1&include_adult=false`
    )
      .then((response) => JSON.parse(response))
      .then((parsedResponse) => {
        setResults(parsedResponse.results);
        const searchResults = {
          message: parsedResponse.results,
        };
        return searchResults;
      })
      .catch((err) => {
        return console.log("error");
      });
  };

  handleSearch();
  if (!currentUser) return <Loading />;
  else {
    console.log(currentUser.likedMovies);
  }

  return (
    <div>
      {results.length > 0 ? (
        results.map((movie) => {
          return (
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
          );
        })
      ) : (
        <Loading />
      )}
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

export default MovieList;
