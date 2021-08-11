import react, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import Loading from "./Loading";

const Prediction = () => {
  const { currentUser, likedMovies, mostPopularGenreId } =
    useContext(CurrentUserContext);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const genreArray = [];
  const [genreId, setGenreId] = useState("");
  const [movieId, setMovieId] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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

  // Find n random element in arr
  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than availables");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  useEffect(() => {
    console.log(likedMovies);
    likedMovies.map((movie) => {
      return movie.genre.map((genre) => {
        return genreArray.push(genre.id);
      });
    });
    const Id = mostFrequent(genreArray, genreArray.length);
    setGenreId(Id);
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&page=1`
    )
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        let array = getRandom(data.results, 3);
        setPopularMovies(array);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a56759345cdd5a5d3830b778270ea182&with_genres=${genreId}`
    )
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        let array = getRandom(data.results, 3);
        setGenreMovies(array);
        return array;
      })
      .catch((err) => {
        console.log("error");
      });
  }, [genreId]);

  if (likedMovies.length === 0) {
    return <Loading />;
  } else {
    const randomMovies = getRandom(likedMovies, 3);
    return (
      <Container>
        <TagLine>Movies recommended from movies you've seen</TagLine>
        <RecomendationContainer>
          {randomMovies.map((movie, index) => {
            return (
              <div key={index}>
                {" "}
                <Title>{movie.title}</Title>
                <img
                  src={`https://image.tmdb.org/t/p/w185/${movie.posterPath}`}
                />
              </div>
            );
          })}
        </RecomendationContainer>
        <TagLine>Movies recommended from your favorite genre</TagLine>
        <GenreContainer>
          {genreMovies.map((movie, index) => {
            return (
              <div key={index}>
                {" "}
                <Title>{movie.title}</Title>
                <img
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                />
              </div>
            );
          })}
        </GenreContainer>
        <TagLine>Movies recommended from popular movies right now</TagLine>
        <PopularContainer>
          {popularMovies.map((movie, index) => {
            return (
              <div key={index}>
                {" "}
                <Title>{movie.title}</Title>
                <img
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                />
              </div>
            );
          })}
        </PopularContainer>
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1200px;
  /* background-color: red; */
`;
const PopularContainer = styled.div`
  display: flex;
  /* margin-top: 10px; */
  justify-content: space-around;
  width: 1000px;
  border: solid 2px black;
`;
const GenreContainer = styled.div`
  display: flex;
  /* margin-top: 10px; */
  justify-content: space-around;
  width: 1000px;
  border: solid 2px black;
`;
const RecomendationContainer = styled.div`
  display: flex;
  /* margin-top: 10px; */
  justify-content: space-around;
  width: 1000px;
  border: solid 2px black;
`;

const Title = styled.div`
  max-width: 180px;
  min-height: 30px;
  margin-top: 10px;
`;

const TagLine = styled.span`
  font-size: 25px;
  justify-content: base;
  width: 900px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export default Prediction;
