import Auth0ProviderWithHistory from "./auth0Provider";
import AuthenticationButton from "./authentification-button";
import Profile from "./profile";
function App() {
  return (
    <Auth0ProviderWithHistory>
      <AuthenticationButton />
      <Profile />
    </Auth0ProviderWithHistory>
  );
}

export default App;
