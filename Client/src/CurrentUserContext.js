import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [auth0Email, setAuth0Email] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (auth0Email) {
      fetch(`/profile/users/${auth0Email.email}`)
        // When the data is received, update currentUser
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
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
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
