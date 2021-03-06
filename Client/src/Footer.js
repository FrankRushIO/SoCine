import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiGithub,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { fadeInDown } from "react-animations";
import { slideInRight } from "react-animations";

const Footer = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Wrapper>
      <LinksSection>
        <div>
          <Header>Support</Header>
          <ListOfLinks>
            <li>
              <StyledNavLink to="/contact">Contact Us</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/helpcenter">Help Centre</StyledNavLink>
            </li>
          </ListOfLinks>
        </div>
        <div>
          <Header>About Us</Header>
          <ListOfLinks>
            <li>
              <StyledNavLink to="/companyinfo">Company Info</StyledNavLink>
            </li>
          </ListOfLinks>
        </div>
        <div>
          <Header>Account</Header>
          <ListOfLinks>
            <li>
              <StyledNavLink to={`/`}>Home</StyledNavLink>
            </li>
          </ListOfLinks>
        </div>
      </LinksSection>

      <SocialSection>
        <FiFacebook />
        <FiInstagram />
        <FiTwitter />
        <FiGithub />
        <FiLinkedin />
      </SocialSection>

      <div>©2021 Team SoCine. All Rights Reserved</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: absolute; */
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: white;
  text-align: center;
  z-index: -1;
`;
// Links Section
const LinksSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80vw;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: larger;
  font-family: "Oswald", sans-serif;
  text-decoration: underline;
`;

const ListOfLinks = styled.div`
  font-size: 14px;
  padding-left: 1px;
  list-style-type: none;
  line-height: 1.25rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: large;
  &:hover {
    color: blue;
  }
`;

// Social Section
const SocialSection = styled.div`
  font-size: 20px;
  width: 25vw;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

export default Footer;
