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
import Prediction from "./prediction";
import GlobalStyles from "./GlobalStyles";
import SearchQuery from "./SearchContainer";
import Footer from "./Footer";
import Contact from "./Contact";
import HelpCenter from "./HelpCenter";
import CompanyInfo from "./CompanyInfo";
import Users from "./Users";
import User from "./User";

function App() {
  const { setAuth0Email, currentUser } = useContext(CurrentUserContext);
  const { isLoading, user } = useAuth0();

  useEffect(() => {
    if (user) {
      setAuth0Email(user);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(currentUser);

  return (
    <Auth0ProviderWithHistory>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
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
        <Route path="/prediction">
          <Prediction />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/helpcenter">
          <HelpCenter />
        </Route>
        <Route path="/companyinfo">
          <CompanyInfo />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/pseudo/:pseudo">
          <User />
        </Route>
      </Switch>
      <Footer />
    </Auth0ProviderWithHistory>
  );
}

export default App;
