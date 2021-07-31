import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  if (user === undefined) return <div>not connected</div>;
  else {
    console.log(user);
    return (
      <div>
        <div>{user.email}</div>
        <div>{user.given_name}</div>
        <div>{user.name}</div>
      </div>
    );
  }
};

export default Profile;
