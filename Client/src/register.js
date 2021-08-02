import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { auth0Email } = useContext(CurrentUserContext);
  const email = auth0Email.email;
  const [givenName, setGivenName] = useState("null");
  //   const { user } = useAuth0();
  //   console.log(user.email);
  //   const { name, picture, email } = user;
  return (
    <div>
      <h2>Please register your account</h2>
      <form>
        <label>
          Given Name :
          <input type="text" name="givenName" />
        </label>
        <label>
          Surname :
          <input type="text" name="surName" />
        </label>
        <label>
          Pseudoname :
          <input type="text" name="Pseudo" />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      <p>Email : {email}</p>
    </div>
  );
};

export default Register;
