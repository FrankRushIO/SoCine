import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </Button>
  );
};

const Button = styled.button`
  background: transparent;
  color: white;
  margin-right: 10px;
  transition: all 0.2s;
  border-radius: 5px;
  padding: 0.2rem 0.8rem 0.2rem 0.8rem;
  border: 1px solid white;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

export default LogoutButton;
