import react, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Prediction = () => {
  const { currentUser, likedMovies, mostPopularGenreId } =
    useContext(CurrentUserContext);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const genreArray = [];
  const [genreId, setGenreId] = useState("");
  const [movieId, setMovieId] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    console.log(recommendations);
  }, [recommendations]);

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
    const movieIds = likedMovies.map((movie) => {
      return movie.id;
    });
    setMovieId(movieIds);
  }, [likedMovies]);

  useEffect(() => {
    if (movieId.length <= 3) {
      console.log("hey", movieId);
      return <div>Loading</div>;
    } else {
      console.log(movieId);
      const randomMovieIds = getRandom(movieId, 4);
      console.log(randomMovieIds);
      randomMovieIds.forEach((id) => {
        console.log(id);
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&page=1`
        )
          // When the data is received, update currentUser
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const result = data.results[0].title;
            console.log(result);
            setRecommendations([...recommendations, result]);
          })
          .catch((err) => {
            console.log("error");
          });
      });
    }
  }, [movieId]);

  useEffect(() => {
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
        console.log(data);
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
        console.log(data);
        let array = getRandom(data.results, 3);
        setGenreMovies(array);
        return array;
      })
      .catch((err) => {
        console.log("error");
      });
  }, [genreId]);

  if (recommendations === []) return <di>Loading...</di>;
  else {
    console.log(recommendations);
    return (
      <div>
        <div>
          {popularMovies.map((movie, index) => {
            return <div key={index}> popular {movie.title}</div>;
          })}
        </div>
        <div>
          {genreMovies.map((movie, index) => {
            return <div key={index}> genre {movie.title}</div>;
          })}
        </div>
        <div>
          {recommendations.map((movie, index) => {
            return <div key={index}>Recommendations {movie}</div>;
          })}
        </div>
      </div>
    );
  }
};

export default Prediction;
