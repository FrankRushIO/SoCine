import Auth0ProviderWithHistory from "./auth0Provider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./Authentification/protected-route";
// import { CurrentUserContext } from "./CurrentUserContext";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Auth0ProviderWithHistory>
      <Header />
      {/* <Main> */}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
      {/* </Main> */}
    </Auth0ProviderWithHistory>
  );
}

export default App;
