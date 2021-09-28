import Image from "next/image";

import { PlusCircleIcon } from "@heroicons/react/solid";

function CreateStory({ profileSrc }) {
  return (
    <div className="relative h-56 w-32 bg-white rounded-3xl  cursor-pointer overflow-x transition duration-200 transform ease-in hover:scale-105 ">
      <Image
        className="rounded-t-3xl"
        src={profileSrc}
        width={124}
        height={150}
        objectFit="initial"
        layout="fixed"
      />
      <div className="flex flex-col items-center  z-50">
        <div className="absolute bottom-12 bg-white rounded-full p-1">
          <PlusCircleIcon className="text-blue-500 font-medium h-10 w-10" />
        </div>
        <div className="absolute bottom-5 font-medium">Create story</div>
      </div>
    </div>
  );
}

export default CreateStory;
