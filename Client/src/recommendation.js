import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

const request = require("request-promise");

const Recommendations = ({ id }) => {
  const [recommendations, setRecommendations] = useState(null);

  console.log(id);
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
        // console.log(recommendation);
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

  if (recommendations === null) return <div>Loading</div>;
  else {
    return (
      <div>
        {recommendations.map((movie, index) => {
          return (
            <div>
              <Link to={`/movie/${recommendations[index].id}`}>
                <p>{movie.title}</p>
              </Link>
              <Poster
                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt="Movie poster"
              />
            </div>
          );
        })}
      </div>
    );
  }
};

const Poster = styled.img`
  width: 100px;
`;

export default Recommendations;
