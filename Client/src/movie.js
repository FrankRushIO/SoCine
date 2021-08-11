import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Recommendations from "./recommendation";
import Loading from "./Loading";

const Movie = () => {
  const { currentUser, setLikeAction, likedMovies } =
    useContext(CurrentUserContext);
  const imported = useParams();
  const searchInput = Object.values(imported)[0];
  const request = require("request-promise");
  const [movie, setMovie] = useState("");
  const [isLiked, setIsLiked] = useState(false);

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
        setMovie(parsedResponse);
        return searchResults;
      })
      .catch((err) => {
        return console.log("error");
      });
  };

  const handleClickLike = () => {
    let type = "";
    if (isLiked) {
      type = "unlike";
      setLikeAction({ isLiked: "unlike", movieId: searchInput });
    } else {
      type = "like";
      setLikeAction({ isLiked: "like", movieId: searchInput });
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
    if (currentUser) {
      verifyLike();
    }
  }, [currentUser, imported]);

  const verifyLike = () => {
    if (!currentUser || currentUser.likedMovies === []) {
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

  const timeConvert = (n) => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  if (movie === "") return <Loading />;
  else {
    return (
      <MoviePage>
        <MovieContainer
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
          }}
        >
          {/* 
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          }}
        > */}
          <div>
            <Poster
              src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
              alt="Movie poster"
            />
          </div>
          <MovieInfo>
            <div>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/movie/${movie.id}`}
              >
                <Title>{movie.title}</Title>
              </Link>
              <ReleaseYear>({movie.release_date.substring(0, 4)})</ReleaseYear>
            </div>
            <SubInfos>
              <ReleaseDate>{movie.release_date}</ReleaseDate>
              <Genres>
                {movie.genres.map((genre, index) => {
                  return <span key={index}>{genre.name} </span>;
                })}
              </Genres>
              <Runtime>{timeConvert(Number(movie.runtime))}</Runtime>
            </SubInfos>
            <SubSubInfos>
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
              <button onClick={handleClickLike}>
                {!isLiked ? "Like " : "Unlike "}
                movie
              </button>
            </SubSubInfos>
            <div style={{ marginTop: "10px", fontStyle: "italic" }}>
              {movie.tagline}
            </div>
            <h1 style={{ marginTop: "10px", marginBottom: "10px" }}>
              Overview
            </h1>
            <Overview>{movie.overview}</Overview>
          </MovieInfo>
        </MovieContainer>
        <RecommendationsContainer>
          <Recommendations id={searchInput} />
        </RecommendationsContainer>
      </MoviePage>
    );
  }
};

const MoviePage = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  width: 100vw;
  height: 100vh;
`;

const MovieContainer = styled.div`
  display: flex;

  width: 1200px;
  padding: 30px;
  .overlay {
    width: 100vw;
    height: 100vh;
    background: rgba(333, 444, 331, 0.4);
  }
`;

const MovieInfo = styled.div`
  margin-left: 30px;
  width: 80%;
`;

const Poster = styled.img`
  border-radius: 10px;
`;

const Title = styled.span`
  font-size: 25px;
`;

const ReleaseYear = styled.span`
  margin-left: 10px;
  color: charcoal;
`;

const SubInfos = styled.div`
  font-size: 14px;
  margin-top: 10px;
  display: flex;
`;

const ReleaseDate = styled.span`
  color: black;
`;
const Genres = styled.span`
  margin-left: 10px;
  color: black;
`;

const Runtime = styled.span`
  margin-left: 10px;
`;

const SubSubInfos = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Score = styled.span`
  margin-right: 10px;
`;

const Average = styled.span`
  color: black;
`;

const Overview = styled.span``;

const RecommendationsContainer = styled.div`
  border-top: 1px dotted black;
  margin-top: 20px;
  display: flex;
`;

export default Movie;
