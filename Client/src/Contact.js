import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Contact = () => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [formData]);

  const handleNameChange = (ev) => {
    setFormData({ ...formData, name: ev.target.value });
  };

  const handleEmailChange = (ev) => {
    setFormData({ ...formData, email: ev.target.value });
  };

  const handlePhoneChange = (ev) => {
    setFormData({ ...formData, phone: ev.target.value });
  };

  const handleMessageChange = (ev) => {
    setFormData({ ...formData, message: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!formData.name) {
      setError("Please enter your name");
    } else if (!formData.email) {
      setError("Please enter your email");
    } else if (!formData.message) {
      setError("Please specify your issue");
    } else if (!validateEmail(formData.email)) {
      setError("Please enter a valid email");
    } else {
      setFormData(initialFormData);
      alert("Your contact request has been processed!");
    }
  };

  const validateEmail = (email) => {
    // Taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const tester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return tester.test(email);
  };
  return (
    <Wrapper>
      <Header>Contact</Header>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Your Name*"
        ></StyledInput>
        <StyledInput
          type="text"
          value={formData.email}
          onChange={handleEmailChange}
          placeholder="Your email*"
        ></StyledInput>
        <StyledInput
          type="text"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Your phone number"
        ></StyledInput>
        <StyledArea
          value={formData.message}
          onChange={handleMessageChange}
          placeholder="Your message*"
        ></StyledArea>
        <StyledButton>Submit</StyledButton>
        {error && <StyledError>{error}</StyledError>}
      </StyledForm>
    </Wrapper>
  );
};

const Header = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const StyledArea = styled.textarea`
  height: 150px;
  font-family: inherit;
  padding: 0.5rem;
  font-size: 14px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const StyledButton = styled.button`
  width: 6rem;
  align-self: flex-end;
  height: 2rem;
  background-color: transparent;
  border: 1px solid black;
  transition: all 200ms;
  cursor: pointer;

  &:hover {
    background-color: black;
    border: 1px solid transparent;
    color: white;
  }
`;

const StyledError = styled.div`
  background-color: rgba(255, 0, 0, 0.2);
  border: 1px solid rgba(255, 0, 0, 0.5);
  margin-top: 1.5rem;
  padding: 1em;
  font-size: 18px;
  text-align: center;
`;

export default Contact;
