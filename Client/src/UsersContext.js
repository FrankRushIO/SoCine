import React, { createContext, useState, useEffect } from "react";

export const UsersContext = createContext(null);

const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersStatus, setUsersStatus] = useState("idle");
  //   const [cartUpdate, setCartUpdate] = useState(false);

  // Get all items
  useEffect(() => {
    setUsersStatus("loading");
    fetch("/users/")
      .then((res) => res.json())
      .then((parsedRes) => {
        setUsers(parsedRes.data);
        setUsersStatus("idle");
      })
      .catch((err) => {
        setUsersStatus(err);
        console.log(err);
      });
    console.log("refetched");
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, setUsers, usersStatus, setUsersStatus }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
