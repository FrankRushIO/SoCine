import React, { useContext, useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";
import { UsersContext } from "./UsersContext";
import { SearchBar } from "./Header";
import Loading from "./Loading";

const Search = () => {
  const { users, setUsers, setUsersStatus, usersStatus } =
    useContext(UsersContext);

  const imported = useParams();
  console.log(imported);
  const searchInput = Object.values(imported)[0];
  console.log(searchInput);

  useEffect(() => {
    fetch(`/pseudo/${searchInput}`)
      // When the data is received, update currentUser
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.data === "Not Found") {
          console.log("Not Found");
        } else {
          console.log(data);
          // setCurrentUser(data.data);
          // setStatus("idle");
        }
      })
      .catch((err) => {
        // setStatus("error");
      });
  }, []);

  return <div>Votre recherche : {searchInput}</div>;
};

export default Search;
