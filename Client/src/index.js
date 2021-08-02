import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0Provider";
import { CurrentUserProvider } from "./CurrentUserContext";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
