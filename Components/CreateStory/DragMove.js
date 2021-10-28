import React, { useState, useEffect } from "react";

function DragMove(props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
    isSvg = false,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const onDown = (event) => {
    setIsDragging(true);
    event.target.setPointerCapture(event.pointerId);
  };

  const onMove = (event) => {
    if (!isDragging) {
      return;
    }
    onDragMove(event);
  };

  const onUp = (event) => setIsDragging(false);

  // Dynamically render a <g> or <div> tag
  const Tag = isSvg ? "g" : "div";

  return (
    <Tag
      touch-action="none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {children}
    </Tag>
  );
}

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default DragMove;
