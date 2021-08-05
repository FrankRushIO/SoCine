import Auth0ProviderWithHistory from "./auth0Provider";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./profile";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./Authentification/protected-route";
import { CurrentUserContext } from "./CurrentUserContext";
import React, { useContext, useEffect } from "react";
import Register from "./register";
import Results from "./results";
import Movie from "./movie";
import MovieList from "./movieList";
function App() {
  const { setAuth0Email } = useContext(CurrentUserContext);
  const { isLoading, user } = useAuth0();

  useEffect(() => {
    if (user) {
      setAuth0Email(user);
    }
  }, [user]);

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
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/results/:search">
          <Results />
        </Route>
        <Route path="/movie/:title">
          <Movie />
        </Route>
        <Route path="/movielist">
          <MovieList />
        </Route>
      </Switch>
      {/* </Main> */}
    </Auth0ProviderWithHistory>
  );
}

export default App;
