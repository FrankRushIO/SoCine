import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [auth0Email, setAuth0Email] = useState(null);
  const history = useHistory();
  const [likedMovies, setLikedMovies] = useState([]);
  const [likeAction, setLikeAction] = useState(undefined);
  const [following, setFollowing] = useState(undefined);
  const [followAction, setFollowAction] = useState(undefined);

  // Handles like actions
  useEffect(() => {
    if (likeAction) {
      if (likeAction.isLiked === "like") {
        setCurrentUser({
          // remove setCurrentUser and put setLikedmovies instead
          ...currentUser,
          likedMovies: [...currentUser.likedMovies, likeAction.movieId],
        });
      } else if (likeAction.isLiked === "unlike") {
        const index = currentUser.likedMovies.indexOf(likeAction.movieId);
        setCurrentUser((currentUser) => {
          const temp = [...currentUser.likedMovies];
          temp.splice(index, 1);
          return {
            ...currentUser,
            likedMovies: [...temp],
          };
        });
      }
    }
  }, [likeAction]);

  // This will set all the current liked movie objects into the state
  useEffect(() => {
    const getAll = async (allPromises) => {
      const values = await Promise.all(allPromises);
      setLikedMovies(values);
    };

    if (currentUser && currentUser.likedMovies) {
      const promiseArray = currentUser.likedMovies.map((id) => {
        return findLikedMovie(id);
      });
      getAll(promiseArray);
    }
  }, [currentUser]);

  // Returns a promise for a single movie object
  const findLikedMovie = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=a56759345cdd5a5d3830b778270ea182`
      );
      const parsedResponse = await response.json();
      console.log("HEEYYYY", parsedResponse);
      const movie = {
        title: parsedResponse.title,
        posterPath: `https://image.tmdb.org/t/p/w185/${parsedResponse.poster_path}`,
        genre: parsedResponse.genres,
        id: parsedResponse.id,
        recommendation: await getFirstRecommendation(parsedResponse.id),
      };
      return movie;
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (followAction) {
      if (followAction.isFollowed === "follow") {
        setCurrentUser({
          // remove setCurrentUser and put setLikedmovies instead
          ...currentUser,
          following: [...currentUser.following, followAction.userId],
        });
      } else if (followAction.isFollowed === "unfollow") {
        const index = currentUser.following.indexOf(followAction.userId);
        setCurrentUser((currentUser) => {
          const temp = [...currentUser.following];
          temp.splice(index, 1);
          return {
            ...currentUser,
            following: [...temp],
          };
        });
      }
    }
  }, [followAction]);

  useEffect(() => {
    const getAllFollowing = async (allPromises) => {
      const values = await Promise.all(allPromises);
      setFollowing(values);
    };

    if (currentUser && currentUser.following) {
      const promiseArray = currentUser.following.map((id) => {
        console.log("followinggg");
        return findFollowing(id);
      });
      getAllFollowing(promiseArray);
    }
    console.log("nopee");
  }, [currentUser]);

  const findFollowing = (id) => {
    console.log(id);
    fetch(`/pseudo/${id}`)
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.data === "Not Found") {
          console.log("Not Found");
        } else {
          const following = data.data;
          return following;
        }
      })
      .catch((err) => {
        // setStatus("error");
      });
  };

  const getFirstRecommendation = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&page=1`
      );
      const parsedResponse = await response.json();
      console.log(parsedResponse.results[0]);

      const movie = {
        title: parsedResponse.results[0].title,
        posterPath: `https://image.tmdb.org/t/p/w185/${parsedResponse.results[0].poster_path}`,
        genre: parsedResponse.results[0].genres,
        id: parsedResponse.results[0].id,
      };
      return movie;
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (auth0Email) {
      fetch(`/profile/users/${auth0Email.email}`)
        // When the data is received, update currentUser
        .then((res) => res.json())
        .then((data) => {
          if (data.data === "Not Found") {
            history.push(`/register`);
          } else {
            setCurrentUser(data.data);
            setStatus("idle");
          }
        })
        .catch((err) => {
          setStatus("error");
        });
    }
  }, [auth0Email]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        setCurrentUser,
        setStatus,
        auth0Email,
        setAuth0Email,
        likedMovies,
        setLikedMovies,
        likeAction,
        setLikeAction,
        followAction,
        setFollowAction,
        following,
        setFollowing,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
