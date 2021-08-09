import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0Provider";
import { CurrentUserProvider } from "./CurrentUserContext";
import UsersContextProvider from "./UsersContext";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <CurrentUserProvider>
        <UsersContextProvider>
          <App />
        </UsersContextProvider>
      </CurrentUserProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
