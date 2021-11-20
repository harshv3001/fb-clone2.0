import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import Post from "./Post";
function Posts({ posts }) {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
              backgroundColor={post.data().backgroundColor}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
              backgroundColor={post.backgroundColor}
            />
          ))}
    </div>
  );
}

export default Posts;
