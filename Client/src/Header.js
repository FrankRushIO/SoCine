import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthenticationButton from "./authentification-button";
import Logo from "./SoCine.png";

const Header = () => {
  return (
    <Container>
      <StyledLogo src={Logo} alt="logo" />
      <SearchBar />
      <AuthenticationButton />
    </Container>
  );
};

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const handleSearchInput = (ev) => {
    console.log(searchInput);
    setSearchInput(ev.target.value);
  };

  const handleSearch = (ev) => {
    if (searchInput.length < 3) {
      ev.preventDefault();
      alert("Your search term has to be at least 3 characters long");
    } else {
      history.push(`/search?name=${searchInput}`);
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

export default Header;
