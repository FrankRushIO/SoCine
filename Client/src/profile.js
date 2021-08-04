import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  const { user } = useAuth0();
  console.log(user.email);
  const { name, picture, email } = user;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  if (!currentUser.pseudo) return <div>Loading</div>;
  else {
    return (
      <div>
        <h1>{currentUser.pseudo}'s profile</h1>
        <div>Given Name: {currentUser.givenName}</div>
        <div>Surname : {currentUser.surname}</div>
        <div>Pseudo: {currentUser.pseudo}</div>
        <div>Email: {currentUser.email}</div>
      </div>
    );
  }
};
export default Profile;
