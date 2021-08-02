import styled, { keyframes } from "styled-components";
import { ImSpinner3 } from "react-icons/im";

const rotateAnimation = keyframes`
   from {
     transform: rotate(0deg);
   }
   to {
     transform: rotate(360deg);
   }
 `;
const Loading = styled(ImSpinner3)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  font-weight: bold;
  animation-name: ${rotateAnimation};
  animation-duration: 10s;
  animation-iteration-count: infinite;
`;

export default Loading;
