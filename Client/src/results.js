import React, { useState } from "react";
import { useParams } from "react-router";
// import { SearchBar } from "./Header";
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

  handleSearch();

  return (
    <Container>
      <ResultIntroDiv>
        <ResultIntro>Results for ... {searchInput}</ResultIntro>
      </ResultIntroDiv>
      {results.length > 0 ? (
        results.map((movie) => {
          return (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/movie/${movie.id}`}
            >
              <MovieContainer>
                <div>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt="Movie poster"
                  />
                </div>
                <MovieInfo>
                  <Title>{movie.title}</Title>
                  <Overview>{movie.overview}</Overview>
                  <Score>
                    Average score:{" "}
                    <Average
                      style={{
                        color:
                          Number(movie.vote_average) > 7
                            ? "green"
                            : Number(movie.vote_average) > 5
                            ? "yellow"
                            : "red",
                      }}
                    >
                      {movie.vote_average}
                    </Average>
                  </Score>
                  <Vote>Voted by {movie.vote_count} Users!</Vote>
                </MovieInfo>
              </MovieContainer>
            </Link>
          );
        })
      ) : (
        <div>loading</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  width: 100vw;
  height: 100vh;
`;

const ResultIntroDiv = styled.div`
  display: flex;
  width: 900px;
  margin-bottom: 10px;
`;

const ResultIntro = styled.h1`
  font-size: 30px;
`;

const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px;
  border: 1px solid black;
  &:hover {
    opacity: 0.5;
  }
  /* flex-direction: column; */
`;

const Poster = styled.img`
  max-width: 200px;
  /* border: 1px solid black; */
`;

const MovieInfo = styled.div`
  /* margin: 20px; */
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 10px;
`;

const Title = styled.span`
  font-size: 25px;
`;

const Genre = styled.span`
  margin-top: 10px;
`;

const Score = styled.span`
  margin-top: 10px;
`;

const Vote = styled.span`
  margin-top: 10px;
`;

const Average = styled.span`
  color: black;
`;

const Overview = styled.span`
  margin-top: 10px;
`;

export default Results;
