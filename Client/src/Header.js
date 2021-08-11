import React, { useState, useContext, useEffect } from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./SoCine.png";
import AuthNav from "./Authentification/auth-nav";
import { CurrentUserContext } from "./CurrentUserContext";

// const { REACT_APP_TMDB_KEY } = process.env;

const Header = () => {
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Container>
      <Link to="/">
        <StyledLogo src={Logo} alt="logo" />
      </Link>
      <Center>
        <NavItem>
          <StyledNavLink className="navitem" to="/">
            Homepage
          </StyledNavLink>
        </NavItem>
        {currentUser ? (
          <NavItem>
            {console.log(currentUser._id)}
            <StyledNavLink
              className="navitem"
              to={`/profile/${currentUser._id}`}
            >
              Profile
            </StyledNavLink>
          </NavItem>
        ) : (
          <NotConnected>Profile (not connected)</NotConnected>
        )}

        <NavItem>
          <StyledNavLink className="navitem" exact to="/prediction">
            Recommendations
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink className="navitem" exact to="/users">
            Users
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

const NotConnected = styled.div`
  color: white;
  margin: 0 2rem;
  padding: 10px;
  font-size: 18px;
  /* background-color: red; */
  max-width: 110px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: baseline;
  padding-bottom: 10px;
  margin-bottom: 30px;
  background-color: #140c5c;
  padding-top: 10px;
`;

const StyledLogo = styled.img`
  width: 200px;
`;

// Search Bar

const SearchInput = styled.input`
  font-size: 14px;
  color: white;
  border: white 1px solid;
  padding: 2px;
  border-radius: 2px;
  background-color: transparent;
  border-radius: 5px;
  padding: 0.35em 1.2em;
  margin-right: 3px;
  &::placeholder {
    color: white;
  }
`;
const SearchButton = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  background-color: transparent;
  transition: all 0.2s;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const NavItem = styled.div`
  margin: 0 2rem;
  padding: 10px;
  font-size: 16px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: larger;
  transition: all 0.2s;
  &:hover {
    border-bottom: 2px solid white;
  }
`;

export default Header;
