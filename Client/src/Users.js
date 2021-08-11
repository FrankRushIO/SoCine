import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import Logo1 from "./Logo1.png";
import Logo2 from "./Logo2.png";
import Logo3 from "./Logo3.png";
import Logo4 from "./Logo4.png";
import Loading from "./Loading";
import { fadeInDown } from "react-animations";

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
    return <Loading />;
  } else {
    console.log(users);
    return (
      <Page>
        <BigContainer>
          <SearchUser />
          <Wrapper>
            {users.data.map((user, index) => {
              console.log(user._id);
              return (
                <UserDiv>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/profile/${user._id}`}
                  >
                    <User>
                      {" "}
                      <Avatar src={user.avatar} />
                      <Pseudo>{user.pseudo}</Pseudo>
                    </User>
                  </NavLink>
                </UserDiv>
              );
            })}
          </Wrapper>
        </BigContainer>
      </Page>
    );
  }
};
const fadeAnimationDown = keyframes`${fadeInDown}`;

const UserDiv = styled.div`
  animation: 1.5s ${fadeAnimationDown};
`;

const Page = styled.div`
  min-height: 750px;
`;

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
      history.push(`/pseudo/${searchInput}`);
      history.go(0);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        style={{ color: "white", borderColor: "white", borderRadius: "5px" }}
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleSearch(ev);
          }
        }}
        placeholder="Type exact pseudo"
      ></SearchInput>
      <SearchButton
        style={{ color: "white", borderColor: "white", borderRadius: "5px" }}
        className={searchInput.length < 3 ? "" : "working"}
        onClick={handleSearch}
      >
        Search
      </SearchButton>
    </SearchContainer>
  );
};

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  align-items: center;
  justify-content: space-between;
  margin-left: 100px;
`;

const Wrapper = styled.div`
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 30px;
`;

const SearchContainer = styled.div`
  width: 1050px;
  float: left;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-left: 30px;
  margin-top: 30px;

  &:hover {
    opacity: 60%;
  }
`;

const Pseudo = styled.span``;
const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
`;

// Search

const SearchInput = styled.input`
  font-size: 14px;
  padding: 2px;
  margin-right: 10px;
  border-radius: 2px;
  background-color: transparent;
  color: white;
`;
const SearchButton = styled.button`
  color: white;
  font-size: 14px;
  padding: 2px;
  border: 0.1px solid black;
  /* border-radius: 1px; */
  background-color: var(--steel-blue);
  color: black;

  transition: all 200ms;

  &.working {
    cursor: pointer;
    color: black;
    background-color: var(--royal-blue);
    &:hover {
      background-color: var(--steel-blue);
      color: Green;
      border: 0.1px solid black;
    }
  }
`;

export default Users;
