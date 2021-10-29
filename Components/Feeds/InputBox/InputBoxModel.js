import React from "react";
import styled from "styled-components";
import {
  XIcon,
  GlobeIcon,
  ChevronDownIcon,
  PhotographIcon,
  UserAddIcon,
  LocationMarkerIcon,
  KeyIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

function InputBoxModel({ isPhotoInputClicked, setIsPhotoInputClicked }) {
  const [user] = useAuthState(auth);
  return (
    <>
      <Container isPhotoInputClicked={isPhotoInputClicked}>
        {/* header */}
        <div className="relative">
          <div className="flex justify-center items-center p-3 border-b-2">
            <InputModelHeader>Create post</InputModelHeader>
          </div>
          <XIcon
            className="h-8 absolute top-3 right-3 text-gray-600 cursor-pointer hover:bg-gray-300 rounded-full bg-gray-200 p-1"
            onClick={() => setIsPhotoInputClicked(false)}
          />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3 cursor-pointer py-4 mx-4">
          <Image
            className="rounded-full"
            src={user.photoURL}
            width={40}
            height={40}
            layout="fixed"
          />
          <div className="space-y-1">
            <div className="inline-flex font-medium">{user.displayName}</div>
            <div>
              <span></span>
              <div className="bg-gray-200 text-center font-medium rounded-md flex items-center justify-center space-x-1 ">
                <span>
                  <GlobeIcon width={13} />
                </span>
                <span className="text-sm">Public</span>
                <span>
                  <ChevronDownIcon width={20} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* input text */}
        <div className="px-4 relative">
          <input
            className="w-full focus:outline-none"
            placeholder={`What's on your mind, ${user.displayName} ?`}
          />
          <EmojiHappyIcon className="h-8 w-8 text-gray-300 absolute top-0 right-4 font-light cursor-pointer hover:text-gray-400" />
        </div>

        {/* inputs */}
        <div className="my-3 px-2">
          <div className="mt-8 mx-2 space-y-4">
            <div className="border-2 rounded-lg p-2 h-64">
              {/* photos/videos */}
              <div className="bg-gray-100 rounded-lg h-full flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <PhotographIcon className="icon bg-gray-300" />
                  <div className="mt-1 text-lg">Add photos/videos</div>
                  <div className="text-sm text-gray-500">or drag and drop</div>
                </div>
              </div>
            </div>
            {/* other inputs */}
            <div className="border-2 rounded-lg py-2 px-3">
              <div className="flex items-center justify-between">
                <div className="font-medium cursor-pointer ">
                  Add to your post
                </div>
                <div className="flex justify-between space-x-2">
                  <PhotographIcon className="h-9 text-green-400 cursor-pointer hover:bg-gray-100 rounded-full p-1" />
                  <UserAddIcon className="h-8 text-blue-500 cursor-pointer  hover:bg-gray-100  rounded-full p-1" />
                  <EmojiHappyIcon className="h-8 text-yellow-300 cursor-pointer  hover:bg-gray-100 rounded-full p-1" />
                  <LocationMarkerIcon className="h-8 text-red-500 cursor-pointer  hover:bg-gray-100 rounded-full p-1" />
                  <KeyIcon className="h-8 text-gray-400 cursor-pointer rounded-full p-1" />
                  <DotsHorizontalIcon className="h-8 text-gray-400 cursor-pointer  hover:bg-gray-100 rounded-full p-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* post button */}
        <ButtonContainer>
          <ConfirmationButton>Post</ConfirmationButton>
        </ButtonContainer>
      </Container>
      <ConfirmBg isPhotoInputClicked={isPhotoInputClicked}></ConfirmBg>
    </>
  );
}

export default InputBoxModel;

const Container = styled.div`
  display: ${(props) => (props.isPhotoInputClicked ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  background-color: #ffffff;
  max-width: 548px;
  width: 100%;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 0.6rem;
  z-index: 5;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2);
`;

const InputModelHeader = styled.div`
  display: flex;
  font-size: 1.25rem;
  color: #050505;
  font-weight: 500;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  padding: 16px 20px;
`;

const ConfirmationButton = styled.button`
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

const ConfirmBg = styled.div`
  position: fixed;
  display: ${(props) => (props.isPhotoInputClicked ? "flex" : "none")};
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
