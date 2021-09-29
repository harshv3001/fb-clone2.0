import { getSession } from "next-auth/client";
import Head from "next/head";
import Contacts from "../Components/Contacts";
import Feed from "../Components/Feeds";
import Header from "../Components/Header";
import Login from "../Components/Public/Login";
import Sidebar from "../Components/Sidebar";
import { db } from "../firebase";

export default function Home({ session, posts }) {
  if (!session) return <Login />;
  return (
    <div className="bg-gray-100 overflow-hidden ">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Contacts />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);

  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
