import Head from "next/head";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../Components/CreateStory/CreateMain"),
  { ssr: false }
);

function create() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Head>
        <title>Create Stories</title>
      </Head>
      <main className="bg-gray-200 ">
        <DynamicComponentWithNoSSR />
      </main>
    </DndProvider>
  );
}

export default create;
