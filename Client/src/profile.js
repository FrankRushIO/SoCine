import React, { useContext, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { currentUser, likedMovies } = useContext(CurrentUserContext);

  if (currentUser?.pseudo) {
    return (
      <div>
        <h1>{currentUser.pseudo}'s profile</h1>
        <div>Given Name: {currentUser.givenName}</div>
        <div>Surname : {currentUser.surname}</div>
        <div>Pseudo: {currentUser.pseudo}</div>
        <div>Email: {currentUser.email}</div>
        <div>Liked movies : {currentUser.likedMovies}</div>
        <div>
          {likedMovies.map((movie) => {
            return (
              <div>
                <div>{movie.title}</div>
                <img src={movie.posterPath} alt="Movie Poster" />
                <div>
                  {movie.genre.map((genre, index) => {
                    return <div key={index}>{genre.name} </div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else return <div>Loading</div>;
};
export default Profile;
