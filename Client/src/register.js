import React, { useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Logo1 from "./Logo1.png";
import Logo2 from "./Logo2.png";
import Logo3 from "./Logo3.png";
import Logo4 from "./Logo4.png";
import Loading from "./Loading";

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
  const comments = [];
  const _id = uuidv4();
  const [pseudoAvailable, setPseudoAvailable] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleChangeGivenName = (ev) => {
    setGivenName(ev.target.value);
  };

  const handleChangeSurName = (ev) => {
    setSurname(ev.target.value);
  };

  const handleChangePseudo = (ev) => {
    setPseudo(ev.target.value);
  };

  const handleChangeAvatar = (ev) => {
    const logoNumber = Number(ev.target.value);
    console.log(logoNumber);
    if (logoNumber === 1) {
      setAvatar(Logo1);
    } else if (logoNumber === 2) {
      setAvatar(Logo2);
    } else if (logoNumber === 3) {
      setAvatar(Logo3);
    } else {
      setAvatar(Logo4);
    }
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
      comments,
      avatar,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch("/createUser", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.data);
        history.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Le nom a été soumis : " + givenName + surname + pseudo);
    ev.preventDefault();
  };

  if (!auth0Email) return <Loading />;
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
            <PictureDiv>
              <AvatarPhrase>Pick an Avatar </AvatarPhrase>

              <Input
                type="radio"
                id="myButton1"
                name="Avatar"
                value="1"
                onClick={handleChangeAvatar}
              />
              <Label for="myButton1">
                <Picture src={Logo1} />
              </Label>

              <Input
                type="radio"
                id="myButton2"
                name="Avatar"
                value="2"
                onClick={handleChangeAvatar}
              />
              <Label for="myButton2">
                <Picture src={Logo2} />
              </Label>

              <Input
                type="radio"
                id="myButton3"
                name="Avatar"
                value="3"
                onClick={handleChangeAvatar}
              />
              <Label for="myButton3">
                <Picture src={Logo3} />
              </Label>

              <Input
                type="radio"
                id="myButton4"
                name="Avatar"
                value="4"
                onClick={handleChangeAvatar}
              />
              <Label for="myButton4">
                <Picture src={Logo4} />
              </Label>
            </PictureDiv>
            <input type="submit" value="Create profile" />
          </Form>
        </RegisterContainer>
      </Container>
    );
  }
};

const Radio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Label = styled.label``;

const Input = styled.input`
  height: 100px;
  &:checked + ${Label} {
    background: grey;
    border-radius: 50%;
  }
`;

const AvatarPhrase = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
`;

const PictureDiv = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  &.active {
    border-bottom: 20px solid black;
  }
`;

const Picture = styled.img`
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

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
  height: 900px;
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
