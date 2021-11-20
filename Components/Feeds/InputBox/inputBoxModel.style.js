import styled from "styled-components";

export const Container = styled.div`
  display: ${(props) => (props.isInputModelOpen ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  background-color: #ffffff;
  max-width: 510px;
  width: 100%;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 0.6rem;
  z-index: 5;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2);
`;

export const InputModelHeader = styled.div`
  display: flex;
  font-size: 1.25rem;
  color: #050505;
  font-weight: 500;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  padding: 16px 20px;
`;

export const ConfirmationButton = styled.button`
  display: inline-flex;
  background-color: #1877f2;
  color: white;
  width: 100%;
  height: 38px;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  border: none;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    background-color: #056cf2;
    cursor: pointer;
  }
`;

export const ConfirmBg = styled.div`
  position: fixed;
  display: ${(props) => (props.isInputModelOpen ? "flex" : "none")};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 1);
  opacity: 0.8;
  filter: brightness(2);
  overflow: hidden;
  z-index: 3;
`;
