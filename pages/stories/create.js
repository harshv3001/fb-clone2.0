import Head from "next/head";
import StorySidebar from "../../Components/CreateStory/StorySidebar";
import StoryPreview from "../../Components/CreateStory/StoryPreview";
import { Container } from "../../Components/CreateStory/createStory.style";
import CreateStory from "../../Components/CreateStory/CreateStory";
import { useRef, useState, useEffect } from "react";

function create() {
  const [imageToStory, setImageToStory] = useState(null);
  const [isAddTextClicked, setIsAddTextClicked] = useState(false);
  const filepickerRef = useRef(null);
  const textInputRef = useRef(null);
  const addTextRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (textInputRef.current && textInputRef.current.contains(event.target)) {
        setIsAddTextClicked(true);
      } else if (
        addTextRef.current &&
        !addTextRef.current.contains(event.target)
      ) {
        setIsAddTextClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addTextRef]);

  const addImagetoStoryHandler = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToStory(readerEvent.target.result);
    };
  };

  return (
    <div>
      <Head>
        <title>Create Stories</title>
      </Head>
      <main className="bg-gray-200 ">
        <div className="flex h-screen">
          <StorySidebar
            imageToStory={imageToStory}
            setImageToStory={setImageToStory}
            setIsAddTextClicked={setIsAddTextClicked}
            addTextRef={addTextRef}
          />
          <Container>
            <div className="flex flex-col h-full items-center justify-center">
              {!imageToStory ? (
                <CreateStory
                  filepickerRef={filepickerRef}
                  addImagetoStory={addImagetoStoryHandler}
                />
              ) : (
                <StoryPreview
                  imageToStory={imageToStory}
                  isAddTextClicked={isAddTextClicked}
                  textInputRef={textInputRef}
                />
              )}
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}

export default create;
