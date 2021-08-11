import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      LogIn
    </Button>
  );
};

const Button = styled.button`
  background: transparent;
  color: white;
  margin-right: 10px;
  transition: all 0.2s;
  border-radius: 5px;
  padding: 0.2rem 0.6rem 0.2rem 0.6rem;
  border: 1px solid white;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

export default LoginButton;
