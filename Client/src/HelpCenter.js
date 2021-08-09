import React from "react";
import styled from "styled-components";

const HelpCenter = () => {
  const [faqs, setFaqs] = React.useState([]);

  React.useEffect(() => {
    fetch("/faqs/")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.data);
      });
  }, []);

  return (
    <Wrapper>
      <Header>Frequently Asked Questions</Header>
      {faqs.map((faq) => {
        return <Questions faq={faq} key={faq._id} />;
      })}
    </Wrapper>
  );
};

const Questions = ({ faq }) => {
  const { question, answer } = faq;

  return (
    <div>
      <FaqWrapper>
        <Container>
          <Quest>
            Q: {question}
            <Ans>A: {answer}</Ans>
          </Quest>
        </Container>
      </FaqWrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Header = styled.h1`
  margin-top: 25px;
  display: flex;
  align-items: center;
  font-size: 32px;
  font-style: italic;
`;

const FaqWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  padding-top: 25px;
  padding-left: 25%;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* text-decoration: none; */
  /* width: 250px; */
  /* margin: 15px 50px; */
  /* padding: 15px 50px; */
`;

const Quest = styled.div`
  padding-top: 25px;
  font-size: 20px;
  color: black;
`;

const Ans = styled.div`
  padding-top: 15px;
  color: black;
`;

export default HelpCenter;
