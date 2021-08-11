import React from "react";
import styled from "styled-components";
import { SearchBar } from "./Header";
import Searchbackground from "./SearchBackground.jpg";
import { themeVars } from "./GlobalStyles";
import Poster1 from "./Poster6.png";
import Poster2 from "./Poster8.png";

const Homepage = () => {
  return (
    <Container>
      <Div2>
        <Intro1>Welcome to SoCine</Intro1>
      </Div2>
      <SearchContainer>
        <IntroMessageDiv>
          <IntroMessage>Search for any movie ...</IntroMessage>
        </IntroMessageDiv>
      </SearchContainer>
      <Div>
        <Intro2>...anytime, anywhere</Intro2>
      </Div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Div = styled.div`
  width: 1220px;
  height: 200px;
  background-image: url(${Poster1});
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 60px;
  border: 6px solid white;
`;

const Div2 = styled.div`
  margin-bottom: 25px;
  width: 1220px;
  height: 200px;
  background-image: url(${Poster2});
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 60px;
  border: 6px solid white;
`;

const SearchContainer = styled.div`
  background-image: url(${Searchbackground});
  margin-bottom: 25px;
  width: 1220px;
  height: 200px;
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 60px;
  border: 6px solid white;
`;

const Intro1 = styled.h1`
  color: white;
  margin: 5px;
  font-size: 35px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(63, 119, 20, 0.91);
  -webkit-box-shadow: 0px -10px 25px 20px rgba(63, 119, 20, 0.91);
  box-shadow: 0px -10px 25px 20px rgba(63, 119, 20, 0.91);
  padding-right: 50px;
  padding-left: 55px;
`;

const Intro2 = styled.h1`
  color: white;
  margin: 5px;
  font-size: 35px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(178, 20, 20, 0.71);
  -webkit-box-shadow: 0px 11px 25px 29px rgba(178, 20, 20, 0.71);
  box-shadow: 0px 11px 25px 29px rgba(178, 20, 20, 0.71);
  padding: none;
  padding-right: 25px;
  padding-left: 25px;
`;

const IntroMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 25px;
  padding-left: 25px;
`;

const IntroMessage = styled.h1`
  color: white;
  margin: 5px;
  font-size: 35px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(3, 116, 145, 0.9);
  -webkit-box-shadow: 0px -9px 24px 21px rgba(3, 116, 145, 0.9);
  box-shadow: 0px -9px 24px 21px rgba(3, 116, 145, 0.9);
`;

export default Homepage;
