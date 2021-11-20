import React, { useRef, useState, useEffect } from "react";
import * as styled from "./inputBoxModel.style";
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
import { db, storage } from "../../../firebase";
import firebase from "@firebase/app-compat";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { average } from "color.js";

function InputBoxModel({ isInputModelOpen, setIsInputModelOpen }) {
  const [user] = useAuthState(auth);

  const filepickerRef = useRef(null);
  const inputRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const [prominentColor, setProminentColor] = useState({});

  useEffect(() => {
    imageToPost &&
      average(imageToPost, { amount: 1, format: "hex" }).then((color) => {
        setProminentColor(color);
      });
  }, [imageToPost]);

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts")
      .add({
        message: inputRef.current.value || null,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        backgroundColor: prominentColor,
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            () => {
              // when the upload completes
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
    setIsInputModelOpen(false);
  };

  const addImagetoPost = (e) => {
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <>
      <styled.Container isInputModelOpen={isInputModelOpen}>
        {/* header */}
        <div className="relative">
          <div className="flex justify-center items-center p-3 border-b-2">
            <styled.InputModelHeader>Create post</styled.InputModelHeader>
          </div>
          <XIcon
            className="h-8 absolute top-3 right-3 text-gray-600 cursor-pointer hover:bg-gray-300 rounded-full bg-gray-200 p-1"
            onClick={() => setIsInputModelOpen(false)}
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
        {/* inputs */}
        <div
          className={`${imageToPost ? "overflow-y-auto" : "overflow-y-hidden"}`}
        >
          {/* input text */}
          <div className="px-4 relative">
            <input
              ref={inputRef}
              className="w-full focus:outline-none"
              placeholder={`What's on your mind, ${user.displayName} ?`}
            />
            <EmojiHappyIcon className="h-8 w-8 text-gray-300 absolute top-0 right-4 font-light cursor-pointer hover:text-gray-400" />
          </div>

          {/* inputs photos */}
          <div className="mt-3 px-2 max-h-96">
            <div className="mt-8 mx-2 space-y-4">
              <div className="border-2 rounded-lg p-2 relative">
                {/* photos/videos */}

                {imageToPost ? (
                  <div>
                    <img
                      className="h-full w-full rounded-lg"
                      src={imageToPost}
                      alt=""
                    />
                    <XIcon
                      className="h-8 absolute top-3 right-3 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full bg-white p-1"
                      onClick={removeImage}
                    />
                  </div>
                ) : (
                  <div className="h-64">
                    <div
                      className="bg-gray-100 rounded-lg h-full flex justify-center items-center hover:bg-gray-200 cursor-pointer"
                      onClick={() => filepickerRef.current.click()}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <PhotographIcon className="icon bg-gray-300" />
                        <div className="mt-1 text-lg">Add photos/videos</div>
                        <div className="text-sm text-gray-500">
                          or drag and drop
                        </div>
                        <input
                          ref={filepickerRef}
                          type="file"
                          onChange={addImagetoPost}
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* other inputs */}
        <div className="px-2">
          <div className="mt-8 mx-2 space-y-4">
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
        <styled.ButtonContainer>
          <styled.ConfirmationButton onClick={sendPost}>
            Post
          </styled.ConfirmationButton>
        </styled.ButtonContainer>
      </styled.Container>
      <styled.ConfirmBg isInputModelOpen={isInputModelOpen}></styled.ConfirmBg>
    </>
  );
}

export default InputBoxModel;
