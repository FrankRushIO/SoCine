import { useAuth0 } from "@auth0/auth0-react";
import React, { createContext, useEffect, useState } from "react";
import Loading from "./Loading";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const { user } = useAuth0();

  useEffect(() => {
    fetch("http://localhost:4000/profile/users/franciscool@mail.com")
      // When the data is received, update currentUser.
      // Also, set `status` to `idle`
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// useEffect(() => {
// if (user === undefined) {
//   setCurrentUser("no users");
//   console.log("User not connected");
// } else {
//   const email = user.email;

//   fetch(`localhost:4000/profile/users/${email}`)
//     fetch(`localhost:4000/profile/users/frankog@hotmail.fr`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === 404) {
//           console.log("404");
//         } else {
//           console.log(data);
//           setCurrentUser("Francis");
//           setStatus("idle");
//         }
//       })
//       .catch((err) => {
//         setStatus("error");
//       });
//     // }
//   }, []);
