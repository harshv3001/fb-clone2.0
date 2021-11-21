import Image from "next/image";
import { XIcon, CogIcon } from "@heroicons/react/solid";
import { Link } from "../../Utils/link";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";
import styled from "styled-components";
import { useState } from "react";
import DiscardModel from "./DiscardModel";

function StorySidebar({
  imageToStory,
  setImageToStory,
  setIsAddTextClicked,
  addTextRef,
}) {
  const [user] = useAuthState(auth);
  const [isdiscardClicked, setIsdiscardClicked] = useState(false);
  const [isCloseClicked, setIsCloseClicked] = useState(false);

  const closeCreateStory = () => {
    if (imageToStory) {
      setIsCloseClicked(true);
      setIsdiscardClicked(true);
      return;
    }
    router.push("/");
  };
  return (
    <>
      <Container>
        <div className="bg-white shadow-lg flex flex-col min-h-full ">
          <div className="flex items-center px-2 border-b-2">
            <XIcon
              onClick={closeCreateStory}
              className="h-11 mb-2 text-white bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-500"
            />
            <Link href="/">
              <Image
                src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
                width={60}
                height={60}
                layout="fixed"
              />
            </Link>
          </div>
          <div className="px-4 pt-5 pb-3">
            <div className="flex justify-between">
              <h1 className="text-2xl font-medium">Your story</h1>
              <CogIcon className="icon2" />
            </div>
          </div>
          <div className="flex flex-col flex-grow flex-shrink overflow-y-auto">
            <div className="flex flex-col px-4">
              <div className="flex items-center space-x-2 pb-5 border-b-2">
                <Image
                  className="rounded-full"
                  src={user.photoURL}
                  width={55}
                  height={55}
                  layout="fixed"
                />
                <span>{user.displayName}</span>
              </div>
              {imageToStory && (
                <div
                  ref={addTextRef}
                  className="w-full flex space-x-4 items-center mt-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => setIsAddTextClicked(true)}
                >
                  <div className="icon2">Aa</div>
                  <h2 className="text-lg font-medium">Add Text</h2>
                </div>
              )}
            </div>
          </div>
          {imageToStory && (
            <div className="px-3 flex h-16 space-between items-center shadow-inner">
              <button
                className="bg-gray-200 flex-grow h-10 mx-2 rounded-md hover:bg-gray-300 "
                onClick={() => setIsdiscardClicked(true)}
              >
                <span className="font-bold">Discard</span>
              </button>
              <button className="bg-blue-500 flex-grow h-10 mx-2 rounded-md hover:bg-blue-600 ">
                <span className="font-bold text-white">Share to Story</span>
              </button>
            </div>
          )}
        </div>
      </Container>
      <DiscardModel
        isdiscardClicked={isdiscardClicked}
        setIsdiscardClicked={setIsdiscardClicked}
        setImageToStory={setImageToStory}
        isCloseClicked={isCloseClicked}
      />
    </>
  );
}

export default StorySidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  position: relative;
  max-width: 100%;
  min-height: inherit;
  min-width: 0;
  z-index: 1;
  overflow-anchor: none;
  box-sizing: border-box;
  flex-shrink: 0;
`;
