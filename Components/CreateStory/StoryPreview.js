import React from "react";
import * as Styled from "./createStory.style";
import { useRef, useState, useEffect } from "react";
import InputRange from "./InputRange";
import DragMove from "./DragMove";
import { average } from "color.js";
import { ReplyIcon } from "@heroicons/react/solid";

function StoryPreview({ imageToStory }) {
  const [imageSize, setImageSize] = useState("10");
  const [imageRotate, setImageRotate] = useState([0, 90, 180, 270]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });
  const imageRef = useRef(null);
  const imageCustomizeRef = useRef(null);
  const [prominentColor, setProminentColor] = useState({});

  useEffect(() => {
    function handleClickOutside(event) {
      if (imageRef.current && imageRef.current.contains(event.target)) {
        setIsImageSelected(true);
      } else if (
        imageCustomizeRef.current &&
        !imageCustomizeRef.current.contains(event.target)
      )
        setIsImageSelected(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imageRef, imageCustomizeRef]);

  useEffect(() => {
    imageToStory &&
      average(imageToStory, { amount: 1, format: "hex" }).then((color) => {
        setProminentColor(color);
      });
  }, [imageToStory]);

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  const imageSizeHandler = (e) => {
    setImageSize(e.target.value);
  };

  const decrImageSize = () => {
    if (imageSize === "2") return;
    setImageSize((prev) => (parseInt(prev) - 1).toString());
  };

  const incrImageSize = () => {
    if (imageSize === "20") return;
    setImageSize((prev) => (parseInt(prev) + 1).toString());
  };

  const imageRotateHandler = () => {
    const rotateArray = [...imageRotate];
    rotateArray.push(rotateArray.shift());
    setImageRotate(rotateArray);
  };

  return (
    <Styled.CreateStoryScreenContainer>
      <span className="pt-4 px-3 font-bold">Preview</span>
      <Styled.CreateStoryBlackContainer>
        <div className="flex flex-grow relative w-full">
          <Styled.StoryPreviewOutsideContainer>
            <div
              style={{ width: 423.562 }}
              className="overflow-y-hidden overflow-x-hidden absolute h-full"
            >
              <Styled.StoryPreview backgroundColor={prominentColor}>
                <DragMove onDragMove={handleDragMove}>
                  <Styled.StoryImageContainer
                    ref={imageRef}
                    style={{
                      transform: `scale(${imageSize / 10}) rotate(${
                        imageRotate[0]
                      }deg) translate(${translate.x}px, ${translate.y}px)`,
                    }}
                  >
                    <img src={imageToStory} className="" />
                  </Styled.StoryImageContainer>
                </DragMove>
              </Styled.StoryPreview>
              <Styled.InputAddTestContainer>
                <input
                  type="text"
                  className="focus:outline-none bg-transparent placeholder-white placeholder-opacity-90 text-3xl font-bold w-full"
                  placeholder="Start typing"
                />
              </Styled.InputAddTestContainer>
            </div>
          </Styled.StoryPreviewOutsideContainer>

          <Styled.ImageCustomize ref={imageCustomizeRef}>
            {isImageSelected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div
                    style={{ userSelect: "none" }}
                    unselectable="on"
                    className={`text-4xl text-white ${
                      imageSize === "2"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => decrImageSize()}
                  >
                    -
                  </div>
                  <InputRange
                    value={imageSize}
                    maxValue="20"
                    minValue="2"
                    UpdateChange={imageSizeHandler}
                  />
                  <div
                    style={{ userSelect: "none" }}
                    unselectable="on"
                    className={`text-2xl text-white ${
                      imageSize === "20"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => incrImageSize()}
                  >
                    +
                  </div>
                </div>
                <Styled.RotateButton onClick={() => imageRotateHandler()}>
                  <ReplyIcon
                    className="h-4 text-black mr-2"
                    style={{ transform: "rotateY(180deg)" }}
                  />
                  <span className="font-medium text-sm">Rotate</span>
                </Styled.RotateButton>
              </div>
            ) : (
              <div className="flex items-center text-white text-md">
                Select photo to crop and rotate
              </div>
            )}
          </Styled.ImageCustomize>
        </div>
      </Styled.CreateStoryBlackContainer>
    </Styled.CreateStoryScreenContainer>
  );
}

export default StoryPreview;
