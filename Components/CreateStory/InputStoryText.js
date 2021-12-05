import React, { useEffect, useRef } from "react";

import { Transformer, Text } from "react-konva";

function InputStoryText({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  editInput,
  hideText,
}) {
  const shapeRef = useRef();
  const trRef = useRef();
  const { value, id, y, x, width, height } = shapeProps;
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        y={y}
        x={x}
        width={width}
        height={height}
        align="center"
        verticalAlign="middle"
        fill="#ffffff"
        padding={5}
        fontSize={28}
        fontStyle="bold"
        text={value}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onMouseOver={() => {
          document.body.style.cursor = "move";
          onSelect();
        }}
        onMouseOut={() => {
          document.body.style.cursor = "default";
        }}
        onDblClick={() => {
          editInput(id);
        }}
        visible={hideText[id] ? false : true}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio="false"
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
            "top-center",
            "bottom-center",
            "middle-left",
            "middle-right",
          ]}
        />
      )}
    </>
  );
}

export default InputStoryText;
