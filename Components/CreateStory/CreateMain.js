import { useRef, useState, useEffect } from "react";
import StorySidebar from "./StorySidebar";
import StoryPreview from "./StoryPreview";
import { Container } from "./createStory.style";
import CreateStory from "./CreateStory";

function CreateMain() {
  const [imageToStory, setImageToStory] = useState(null);
  const [isAddTextClicked, setIsAddTextClicked] = useState(false);
  const filepickerRef = useRef(null);
  const textInputRef = useRef(null);
  const addTextRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (textInputRef.current && textInputRef.current.contains(event.target)) {
        setIsAddTextClicked(true);
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
                setIsAddTextClicked={setIsAddTextClicked}
              />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default CreateMain;
