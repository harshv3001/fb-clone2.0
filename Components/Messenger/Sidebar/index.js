import {
  VideoCameraIcon,
  PencilAltIcon,
  DotsHorizontalIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <div>
      <div className="flex sticky top-0 bg-white z-10 justify-between items-center h-7 p-5 ">
        <span className="font-bold text-2xl">Messenger</span>
        <div className="flex space-x-4">
          <DotsHorizontalIcon className="w-7 text-gray-500  " />
          <VideoCameraIcon className="w-7 text-gray-500  " />
          <PencilAltIcon className="w-7 text-gray-500 " />
        </div>
      </div>
      <div className="flex items-center p-2 rounded-full bg-gray-100">
        <SearchIcon className="h-5 w-5 text-gray-400 " />
        <input
          placeholder="Search Messenger"
          className=" bg-gray-100 flex-1 focus:outline-none"
        />
      </div>
      <button
        className="bg-gray-100 my-4 p-3 text-xl uppercase w-full"
        onClick={() => createChat()}
      >
        Start a new chat
      </button>
      {/* lists of chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <ChatList key={chat.id} id={chat.id} user={chat.data().users} />
      ))}
    </div>
  );
}

export default Sidebar;
