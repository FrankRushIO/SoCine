import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const Users = () => {
  const { currentUser, likedMovies, mostPopularGenreId } =
    useContext(CurrentUserContext);
  const [users, setUsers] = useState("");

  const findUsers = async () => {
    try {
      const response = await fetch(`/users`);
      const parsedResponse = await response.json();
      console.log(parsedResponse.data);
      setUsers(parsedResponse);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    findUsers();
  }, []);

  if (users === "") {
    console.log(users);
    return <div>Loading...</div>;
  } else {
    console.log(users);
    return (
      <Container>
        <SearchUser />
        <Wrapper>
          {users.data.map((user) => {
            return (
              <User>
                {" "}
                <Surname>{user.surname}</Surname>
                <Name>{user.givenName}</Name>
                <Pseudo>{user.pseudo}</Pseudo>
                <Avatar>{user.pseudo.substring(0, 1)}</Avatar>
              </User>
            );
          })}
        </Wrapper>
      </Container>
    );
  }
};

const SearchUser = () => {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const handleSearchInput = (ev) => {
    console.log(searchInput);
    setSearchInput(ev.target.value);
  };

  const handleSearch = (ev) => {
    if (searchInput.length < 3) {
      console.log(searchInput);
      ev.preventDefault();
      alert("Your search term has to be at least 3 characters long");
    } else {
      history.push(`/pseudo?name=${searchInput}`);
      history.go(0);
    }
  };

  return (
    <div>
      <SearchInput
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleSearch(ev);
          }
        }}
        placeholder="Search for any items"
      ></SearchInput>
      <SearchButton
        className={searchInput.length < 3 ? "" : "working"}
        onClick={handleSearch}
      >
        Search
      </SearchButton>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Surname = styled.span``;
const Name = styled.span``;
const Pseudo = styled.span``;
const Avatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: red;
  font-size: 40px;
`;

// Search

const SearchInput = styled.input`
  font-size: 14px;
  padding: 2px;
  margin-right: 10px;
  border-radius: 2px;
`;
const SearchButton = styled.button`
  font-size: 14px;
  padding: 2px;
  border: 0.1px solid black;
  /* border-radius: 1px; */
  background-color: var(--steel-blue);
  color: white;

  transition: all 200ms;

  &.working {
    cursor: pointer;
    color: white;
    background-color: var(--royal-blue);
    &:hover {
      background-color: var(--steel-blue);
      color: white;
      border: 0.1px solid black;
    }
  }
`;

export default Users;
