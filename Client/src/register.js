import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);
  const { auth0Email } = useContext(CurrentUserContext);
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const email = auth0Email.email;
  const history = useHistory();

  const handleChangeGivenName = (ev) => {
    setGivenName(ev.target.value);
  };

  const handleChangeSurName = (ev) => {
    setSurname(ev.target.value);
  };

  const handleChangePseudo = (ev) => {
    setPseudo(ev.target.value);
  };

  const handleSubmit = (ev) => {
    const newUser = { givenName, surname, pseudo, email };
    console.log(newUser);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch("/createUser", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        history.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Le nom a été soumis : " + givenName + surname + pseudo);
    ev.preventDefault();
  };

  return (
    <div>
      <h2>Please register your account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Given Name :
          <input
            type="text"
            value={givenName}
            onChange={handleChangeGivenName}
          />
        </label>
        <label>
          Surname :
          <input type="text" value={surname} onChange={handleChangeSurName} />
        </label>
        <label>
          Pseudo :
          <input type="text" value={pseudo} onChange={handleChangePseudo} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
      <p>Email : {email}</p>
    </div>
  );
};

export default Register;
