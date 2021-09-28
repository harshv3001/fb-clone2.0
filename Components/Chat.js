import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  {
    name: "Mitt Parmar",
    profile: "/stories/1.jpg",
  },
  {
    name: "Vishesh Bhatt",
    profile: "/stories/5.jpeg",
  },
  {
    name: "Vish Verma",
    profile: "/stories/2.jpg",
  },
  {
    name: "Divyash Bhattnagar",
    profile: "/stories/4.jpg",
  },
  {
    name: "Deepika Padukon",
    profile: "/stories/3.jpeg",
  },
];

function Chat() {
  return (
    <div className="hidden lg:flex flex-col w-60 py-2 px-4 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {contacts.map((contact) => (
        <Contact
          key={contact.profile}
          src={contact.profile}
          name={contact.name}
        />
      ))}
    </div>
  );
}

export default Chat;
