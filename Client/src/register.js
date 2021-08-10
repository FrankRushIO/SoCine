import React, { useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Register = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { auth0Email } = useContext(CurrentUserContext);
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const email = auth0Email.email;
  const history = useHistory();
  const likedMovies = [];
  const following = [];
  const followedBy = [];
  const _id = uuidv4();
  const [pseudoAvailable, setPseudoAvailable] = useState(false);

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
    const newUser = {
      givenName,
      surname,
      pseudo,
      email,
      likedMovies,
      _id,
      following,
      followedBy,
    };
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

  if (!auth0Email) return <div>Loading...</div>;
  else {
    return (
      <Container>
        <RegisterMessage>Please register your account</RegisterMessage>
        <RegisterContainer>
          <Form onSubmit={handleSubmit}>
            <InputLabel>
              Given Name :
              <InputField
                type="text"
                value={givenName}
                onChange={handleChangeGivenName}
                required
              />
            </InputLabel>
            <InputLabel>
              Surname :
              <InputField
                type="text"
                value={surname}
                onChange={handleChangeSurName}
                required
              />
            </InputLabel>
            <InputLabel>
              Pseudo :
              <InputField
                type="text"
                value={pseudo}
                onChange={handleChangePseudo}
                required
              />
            </InputLabel>
            <Email>Email : {email}</Email>
            <input type="submit" value="Envoyer" />
          </Form>
        </RegisterContainer>
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  height: 70vh;
  width: 100vw;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  /* background-color: red; */
  width: 800px;
  background-color: pink;
  height: 400px;
`;

const RegisterMessage = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
  color: #e34665;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  /* width: 800px; */
  background-color: pink;
`;

const InputLabel = styled.label`
  color: #e34665;
  display: block;
  top: 27px;
  left: 55px;
  background: #ffffff;
  transition: 300ms;
  background-color: pink;
  margin-bottom: 5px;
`;
const InputField = styled.input`
  outline: none;
  display: block;
  color: #3777ff;
  padding: 16px 22px;
  border: 1px solid #dadce0;
  font-size: 18px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 350px;
  background-color: white;
`;

const Email = styled.p`
  margin-bottom: 30px;
  color: #e34665;
`;

export default Register;
