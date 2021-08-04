import { useParams } from "react-router";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthenticationButton from "./Authentification/authentification-button";
import SignupButton from "./Authentification/singin-button";
import Logo from "./SoCine.png";
import AuthNav from "./Authentification/auth-nav";
const { REACT_APP_TMDB_KEY } = process.env;

const Header = () => {
  return (
    <Container>
      <StyledLogo src={Logo} alt="logo" />
      <SearchBar />
      <AuthNav />
    </Container>
  );
};

export const SearchBar = () => {
  const apiKey = REACT_APP_TMDB_KEY;
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const request = require("request-promise");

  const handleSearchInput = (ev) => {
    console.log(searchInput);
    setSearchInput(ev.target.value);
  };

  const handleSearch = (ev) => {
    if (searchInput.length < 3) {
      ev.preventDefault();
      alert("Your search term has to be at least 3 characters long");
    } else {
      history.push(`/results/${searchInput}`);
    }

    //   return request(
    //     `https://api.themoviedb.org/3/search/movie?api_key=a56759345cdd5a5d3830b778270ea182&language=en-US&query=${searchInput}&page=1&include_adult=false`
    //   )
    //     .then((response) => JSON.parse(response))
    //     .then((parsedResponse) => {
    //       console.log(parsedResponse);
    //       // console.log(REACT_APP_TMDB_KEY);
    //       const searchResults = {
    //         message: parsedResponse,
    //       };
    //       return searchResults;
    //     })
    //     .catch((err) => {
    //       return console.log("error");
    //     });
    // }
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

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: baseline;
`;

const StyledLogo = styled.img`
  width: 200px;
`;

// Search Bar

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
  color: black;

  transition: all 200ms;

  &.working {
    cursor: pointer;
    color: black;
    background-color: var(--royal-blue);
    &:hover {
      background-color: var(--steel-blue);
      color: black;
      border: 0.1px solid black;
    }
  }
`;

export default Header;
