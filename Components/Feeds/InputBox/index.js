import Image from "next/image";

import { EmojiHappyIcon } from "@heroicons/react/outline";
import { VideoCameraIcon, PhotographIcon } from "@heroicons/react/solid";
import { useState } from "react";

import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import InputBoxModel from "./InputBoxModel";

function InputBox() {
  const [user] = useAuthState(auth);
  const [isInputModelOpen, setIsInputModelOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium my-6">
        <div className="flex space-x-4 p-4 items-center">
          <Image
            className="rounded-full"
            src={user.photoURL}
            width={40}
            height={40}
            layout="fixed"
          />
          <div
            className="rounded-full h-12 bg-gray-100 flex flex-grow px-5 focus:outline-none items-center hover:bg-gray-200"
            placeholder={`What's on your mind, Harsh Verma ?`}
            onClick={() => setIsInputModelOpen(true)}
          >
            What's on your mind, {user.displayName} ?
          </div>
        </div>

        <div className="flex justify-evenly p-3 border-t">
          <div className="inputIcon">
            <VideoCameraIcon className="h-7 text-red-500" />
            <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
          </div>

          <div onClick={() => setIsInputModelOpen(true)} className="inputIcon">
            <PhotographIcon className="h-7 text-green-400" />
            <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          </div>

          <div className="inputIcon">
            <EmojiHappyIcon className="h-7 text-yellow-300" />
            <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
          </div>
        </div>
      </div>
      <InputBoxModel
        isInputModelOpen={isInputModelOpen}
        setIsInputModelOpen={setIsInputModelOpen}
      />
    </>
  );
}

export default InputBox;
