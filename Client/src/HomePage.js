import React from "react";
import styled from "styled-components";
import { SearchBar } from "./Header";
import Searchbackground from "./SearchBackground.jpg";
import { themeVars } from "./GlobalStyles";

const Homepage = () => {
  return (
    <Container>
      <SearchContainer>
        <IntroMessageDiv>
          <IntroMessage>
            Welcome to SoCine, search for any movie ...
          </IntroMessage>
          <SearchBar />
        </IntroMessageDiv>
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SearchContainer = styled.div`
  background-image: url(${Searchbackground});
  background-attachment: fixed;
  width: 1250px;
  height: 200px;
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IntroMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroMessage = styled.h1`
  color: ${themeVars.blueCrayola};
  font-size: 40px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
`;

export default Homepage;
