import React from "react";
import styled from "styled-components";

const CompanyInfo = () => {
  //   return <img src="2037908.jpg"></img>;
  return (
    <div>
      {/* <BackImg src={Water} /> */}
      <Wrapper>
        <Container>
          <Header>About Us</Header>
          <About>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            tincidunt vitae risus et tincidunt. Pellentesque commodo malesuada
            tortor, eget scelerisque sapien egestas sit amet. Nulla sit amet
            vehicula ipsum. Pellentesque vel ipsum a elit placerat dignissim
            facilisis vel dui. Nam purus quam, consectetur sed vulputate ac,
            feugiat et justo. Cras consequat commodo tempor. Nunc fermentum nunc
            non nibh sollicitudin, eget pulvinar ligula cursus. Etiam suscipit
            dolor et efficitur tristique.
          </About>
          <Team>-Team SoCine</Team>
        </Container>
      </Wrapper>
    </div>
  );
};

// const BackImg = styled.img`
//   position: absolute;
//   /* background-position: center; */
//   /* display: block; */
//   padding-left: 5%;
//   padding-right: 5%;
//   padding-bottom: 17%;
//   padding-top: 15px;
//   /* margin-top: auto;
//   margin-bottom: auto; */
//   width: 100vw;
//   height: auto;
//   opacity: 75%;
//   z-index: -1;
//   background-repeat: no-repeat;
// `;

const Wrapper = styled.div`
  z-index: 0;
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 500px;
`;

const Header = styled.div`
  background-color: white;
  text-align: center;
  padding-top: 25px;
  font-size: 40px;
  /* font-style: italic; */
  color: var(--royal-blue);
  text-decoration: 1px underline;
  font-family: var(--font-existence);
`;

const About = styled.div`
  line-height: 1.6;
  padding-top: 35px;
  padding-bottom: 25px;
  padding-left: 75px;
  padding-right: 75px;
  color: darkslateblue;
  background-color: white;
  font-family: var(--font-existence);
  font-size: 18px;
`;

const Team = styled.div`
  background-color: white;
  padding-left: 35px;
  padding-top: 10px;
  padding-bottom: 40px;
  color: darkslateblue;
  font-style: italic;
  font-size: 24px;
  font-family: var(--font-existence);
`;

export default CompanyInfo;
