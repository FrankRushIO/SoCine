import Auth0ProviderWithHistory from "./auth0Provider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./profile";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Header />
      {/* <Main> */}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
      {/* </Main> */}
    </Auth0ProviderWithHistory>
  );
}

export default App;
