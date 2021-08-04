import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SearchBar } from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Results = () => {
  const imported = useParams();
  const searchInput = Object.values(imported)[0];
  const request = require("request-promise");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    return request(
      `https://api.themoviedb.org/3/search/movie?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&query=${searchInput}&page=1&include_adult=false`
    )
      .then((response) => JSON.parse(response))
      .then((parsedResponse) => {
        // console.log(parsedResponse);
        // console.log(REACT_APP_TMDB_KEY);
        // console.log(parsedResponse.results);
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
  // useEffect(() => {
  //   console.log(typeof results);
  // }, [results]);

  handleSearch();

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
        <div>loading</div>
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

export default Results;
