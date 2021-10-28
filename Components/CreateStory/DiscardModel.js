import React from "react";
import styled from "styled-components";
import { XCircleIcon } from "@heroicons/react/solid";
import router from "next/router";

function DiscardModel({
  isdiscardClicked,
  setIsdiscardClicked,
  setImageToStory,
  isCloseClicked,
}) {
  const DiscardHandler = () => {
    if (isCloseClicked) {
      router.push("/");
      return;
    }

    setImageToStory(null);
    setIsdiscardClicked(false);
  };
  return (
    <>
      <Container isdiscardClicked={isdiscardClicked}>
        <div className="flex justify-between items-center pl-4 pr-3 py-2 border-b-2">
          <ConfirmationHeader>Discard story?</ConfirmationHeader>
          <XCircleIcon
            className="h-12 w-12  text-gray-300 cursor-pointer hover:text-gray-400 "
            onClick={() => setIsdiscardClicked(false)}
          />
        </div>
        <ConfirmationText>
          Are you sure you want to discard this story? Your story won't be
          saved.
        </ConfirmationText>
        <ButtonContainer>
          <CancelButton onClick={() => setIsdiscardClicked(false)}>
            Continue Editing
          </CancelButton>
          <ConfirmationButton onClick={DiscardHandler}>
            Discard
          </ConfirmationButton>
        </ButtonContainer>
      </Container>
      <ConfirmBg isdiscardClicked={isdiscardClicked}></ConfirmBg>
    </>
  );
}

export default DiscardModel;

/* The CSS */
const Container = styled.div`
  display: ${(props) => (props.isdiscardClicked ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  background-color: #ffffff;
  max-width: 548px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 0.6rem;
  z-index: 5; /* Higher than the z-index of the background */
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2);
`;

const ConfirmationHeader = styled.div`
  display: flex;
  font-size: 1.25rem;
  color: #050505;
  font-weight: 500;
`;

const ConfirmationText = styled.div`
  display: flex;
  text-align: center;
  font-size: 0.9375rem;
  padding: 8px 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: flex-end;
  padding: 16px 20px;
`;

const ConfirmationButton = styled.button`
  display: inline-flex;
  background-color: #1877f2;
  color: white;
  width: 130px;
  height: 36px;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  border: none;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;

  &:hover {
    background-color: #056cf2;
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  margin-right: 10px;
  color: #1877f2;
  font-weight: 500;
  padding: 0px 10px;

  &:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
  }
`;

const ConfirmBg = styled.div`
  position: fixed;
  display: ${(props) => (props.isdiscardClicked ? "flex" : "none")};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 1);
  opacity: 0.8;
  filter: brightness(2);
  overflow: hidden; /* disable scrolling*/
  z-index: 3; /* higher than all other items, but lower than 
    the confirm box*/
`;
