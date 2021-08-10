import React, { useState, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./SoCine.png";
import AuthNav from "./Authentification/auth-nav";
import { CurrentUserContext } from "./CurrentUserContext";

// const { REACT_APP_TMDB_KEY } = process.env;

const Header = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Container>
      <StyledLogo src={Logo} alt="logo" />
      <Center>
        <NavItem>
          <StyledNavLink className="navitem" to="/">
            HomePage
          </StyledNavLink>
        </NavItem>
        {currentUser ? (
          <NavItem>
            <StyledNavLink
              className="navitem"
              to={`/profile/${currentUser._id}`}
            >
              Profile
            </StyledNavLink>
          </NavItem>
        ) : (
          <div>Profile (not connect)</div>
        )}

        <NavItem>
          <StyledNavLink className="navitem" exact to="/prediction">
            Recommendations
          </StyledNavLink>
        </NavItem>
      </Center>
      <Right>
        <SearchBar />
        <Auth0div>
          <AuthNav />
        </Auth0div>
      </Right>
    </Container>
  );
};

const Auth0div = styled.div`
  padding-left: 125px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: baseline;
  align-content: stretch;
`;
export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  // const request = require("request-promise");

  const handleSearchInput = (ev) => {
    setSearchInput(ev.target.value);
  };

  const handleSearch = (ev) => {
    if (searchInput.length < 3) {
      ev.preventDefault();
      alert("Your search term has to be at least 3 characters long");
    } else {
      history.push(`/results/${searchInput}`);
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
        placeholder="Search for any movie"
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
  margin-bottom: 30px;
`;

const StyledLogo = styled.img`
  width: 200px;
`;

// Search Bar

const SearchInput = styled.input`
  font-size: 14px;
  padding: 2px;
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

const Center = styled.div`
  display: flex;
  margin: 0 auto;
`;

const NavItem = styled.div`
  margin: 0 2rem;
  padding: 10px;
  font-size: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: larger;

  &.active.navitem {
    border-bottom: 1px solid black;
  }
`;

export default Header;
