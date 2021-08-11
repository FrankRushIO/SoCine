import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import Loading from "./Loading";

const request = require("request-promise");

const Recommendations = ({ id }) => {
  const [recommendations, setRecommendations] = useState(null);

  const handleSearch = () => {
    return request(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&page=1`
    )
      .then((response) => JSON.parse(response))
      .then((parsedResponse) => {
        const searchResults = {
          message: parsedResponse,
        };
        const recommendation = searchResults.message.results;
        setRecommendations(recommendation);
        return searchResults;
      })
      .catch((err) => {
        return console.log("error");
      });
  };
  useEffect(() => {
    handleSearch();
  }, [id]);

  if (recommendations === null) return <Loading />;
  else {
    return (
      <div>
        <RecommandationsContainer>
          {recommendations.map((movie, index) => {
            return (
              <Movie>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    height: "20px",
                  }}
                  to={`/movie/${recommendations[index].id}`}
                >
                  <div
                    style={{
                      minHeight: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Title>{movie.title}</Title>
                  </div>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt="Movie poster"
                  />
                </Link>
              </Movie>
            );
          })}
        </RecommandationsContainer>
      </div>
    );
  }
};

const RecommandationsContainer = styled.div`
  display: flex;
  max-width: 1200px;
  overflow-x: scroll;
  padding-right: 5px;
  padding-left: 5px;
`;

const Movie = styled.div`
  margin-right: 13px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
  min-height: 200px;
`;
const Title = styled.span`
  font-size: 10px;
  min-height: 20px;
  /* border: 1px solid black; */
`;
const Poster = styled.img`
  width: 100px;
  position: relative;
  border-radius: 5px;
`;

export default Recommendations;
