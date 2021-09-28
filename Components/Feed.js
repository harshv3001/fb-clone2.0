import InputBox from "./InputBox";
import Posts from "./Posts";
import Stories from "./Stories";

function Feed() {
  return (
    <div className=" flex flex-grow h-screen pt-6 mx-4 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl ">
        <Stories />
        <InputBox />
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
