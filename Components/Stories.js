import CreateStory from "./CreateStory";
import StoryCard from "./StoryCard";
import { useSession } from "next-auth/client";

const stories = [
  {
    name: "Mitt Parmar",
    image: "/stories/coffee.jpg",
    profile: "/stories/1.jpg",
  },
  {
    name: "Vishesh Bhatt",
    image: "/stories/dog.jpg",
    profile: "/stories/5.jpeg",
  },
  {
    name: "Vish Verma",
    image: "/stories/travel.jpg",
    profile: "/stories/2.jpg",
  },
  {
    name: "Divyash Bhattnagar",
    image: "/stories/fitness.jpg",
    profile: "/stories/4.jpg",
  },
];
function Stories() {
  const [session, loading] = useSession();
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      <CreateStory profileSrc={session.user.image} />
      {stories.map((story) => (
        <StoryCard
          key={story.image}
          name={story.name}
          src={story.image}
          profile={story.profile}
        />
      ))}
    </div>
  );
}

export default Stories;
