import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  if (!currentUser?.pseudo) return <div>Loading</div>;
  else {
    return (
      <div>
        <h1>{currentUser.pseudo}'s profile</h1>
        <div>Given Name: {currentUser.givenName}</div>
        <div>Surname : {currentUser.surname}</div>
        <div>Pseudo: {currentUser.pseudo}</div>
        <div>Email: {currentUser.email}</div>
        <div>Liked movies : {currentUser.likedMovies}</div>
      </div>
    );
  }
};
export default Profile;
