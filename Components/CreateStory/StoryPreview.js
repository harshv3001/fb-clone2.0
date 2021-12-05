import React from "react";
import * as Styled from "./createStory.style";
import { useRef, useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import InputRange from "./InputRange";
import DragMove from "./DragMove";
import { average } from "color.js";
import { ReplyIcon } from "@heroicons/react/solid";
import InputStoryText from "./InputStoryText";
import StoryImage from "./StoryImage";

function StoryPreview({
  imageToStory,
  isAddTextClicked,
  textInputRef,
  setIsAddTextClicked,
}) {
  const [prominentColor, setProminentColor] = useState({});
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });
  const [textInput, setTextInput] = useState("");
  const [textInputsArr, setTextInputsArr] = useState([]);
  const [isEditInput, setIsEditInput] = useState(null);
  const [hideText, setHideText] = useState({});
  const [textAreaRows, setTextAreaRows] = useState({
    rows: 5,
    minRows: 5,
    maxRows: 10,
  });

  const [selectedId, selectShape] = useState(null);
  const [imageSize, setImageSize] = useState("10");
  const [imageRotate, setImageRotate] = useState([0, 90, 180, 270]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const imageRef = useRef(null);
  const imageCustomizeRef = useRef(null);

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

  const addInputHandler = () => {
    if (isEditInput) {
      setTextInputsArr(
        textInputsArr.map((elem) => {
          if (elem.id == isEditInput) {
            return { ...elem, value: textInput };
          }
          return elem;
        })
      );
      setIsEditInput(null);

      toggleInputText(isEditInput);
    } else {
      setTextInputsArr((prev) => [
        ...prev,
        {
          value: textInput,
          id: Math.random().toString(16).slice(2),
          y: 350,
          x: 160,
        },
      ]);
    }
    setTextInput("");
    setIsAddTextClicked(false);
  };

  const editInputHandler = (id) => {
    const newEditInput = textInputsArr.find((element) => element.id === id);
    setIsAddTextClicked(true);
    setTextInput(newEditInput.value);
    setIsEditInput(id);

    toggleInputText(id);
  };

  const toggleInputText = (id) => {
    setHideText((prev) => ({
      ...prev,
      [id]: !prev[id] === undefined ? false : !prev[id],
    }));
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  const ImageClickOutside = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setIsImageSelected(false);
    }
  };
  return (
    <Styled.CreateStoryScreenContainer>
      <span className="pt-4 px-3 font-bold">Preview</span>
      <Styled.CreateStoryBlackContainer>
        <div className="flex flex-grow relative w-full scrollbar-hide">
          <Styled.StoryPreviewOutsideContainer>
            <div style={{ width: 423.562 }} className="absolute h-full ">
              <Styled.StoryPreview backgroundColor={prominentColor}>
                {/* <Stage width={940} height={760} onMouseDown={ImageClickOutside}> */}
                {/* <Layer>
                    <StoryImage
                      {...{
                        imageSize,
                        imageRotate,
                        imageToStory,
                        imageRef,
                        setIsImageSelected,
                      }}
                    />
                  </Layer> */}
                <DragMove onDragMove={handleDragMove}>
                  <Styled.StoryImageContainer
                    ref={imageRef}
                    style={{
                      transform: `scale(${imageSize / 10}) rotate(${
                        imageRotate[0]
                      }deg) translate(${translate.x}px, ${translate.y}px)`,
                    }}
                  >
                    <img alt=" " src={imageToStory} />
                  </Styled.StoryImageContainer>
                </DragMove>
                {isAddTextClicked && (
                  <Styled.InputAddTextContainer ref={textInputRef}>
                    <Styled.InputAddTest
                      rows={textAreaRows}
                      type="text"
                      placeholder="Start typing"
                      autoFocus
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onBlur={addInputHandler}
                    />
                  </Styled.InputAddTextContainer>
                )}
                {textInputsArr.length > 0 && (
                  <div style={{ position: "absolute", zIndex: "3" }}>
                    <Stage
                      width={424}
                      height={763}
                      onMouseLeave={checkDeselect}
                    >
                      <Layer>
                        {textInputsArr.length > 0 &&
                          textInputsArr.map((rect) => {
                            return (
                              <InputStoryText
                                key={rect.id}
                                shapeProps={rect}
                                isSelected={rect.id === selectedId}
                                onSelect={() => {
                                  selectShape(rect.id);
                                }}
                                onChange={(newAttrs) => {
                                  const rects = textInputsArr.slice();
                                  rects[rect.id] = newAttrs;
                                  setTextInputsArr(rects);
                                }}
                                editInput={editInputHandler}
                                hideText={hideText}
                              />
                            );
                          })}
                      </Layer>
                    </Stage>
                  </div>
                )}
              </Styled.StoryPreview>
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
