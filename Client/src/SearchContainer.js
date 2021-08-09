import React from "react";
import styled from "styled-components";
import { SearchBar } from "./Header";
import SearchBackground from "./background.png";
import { themeVars } from "./GlobalStyles";

const SearchQuery = () => {
  return (
    <SearchContainer>
      <img src={SearchBackground} />
      <IntroMessageDiv>
        {/* <IntroMessage>Welcome to SoCine, search for any movie ...</IntroMessage> */}
      </IntroMessageDiv>
      <SearchBar />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  background: url(${SearchBackground}) no-repeat;
  background-attachment: fixed;
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* height: 100vh; ; */
`;

const IntroMessageDiv = styled.div`
  width: 60rem;
  height: 20rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.25);
  background: inherit;
  position: relative;
  &:before {
    content
    position: relative;
  }
`;

const IntroMessage = styled.h1`
  color: ${themeVars.blueCrayola};
  font-size: 40px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
`;

export default SearchQuery;
