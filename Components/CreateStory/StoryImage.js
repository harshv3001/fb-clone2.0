import * as Styled from "./createStory.style";
import React, { useState } from "react";

import { Image } from "react-konva";
import useImage from "use-image";

class StoryImage extends React.Component {
  state = {
    image: null,
    storyImageXY: {
      x: 0,
      y: 0,
    },
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.imageToStory;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image,
      });
    };
  }

  render() {
    const size = this.props.imageSize / 10;
    return (
      <Image
        onClick={() => this.props.setIsImageSelected(true)}
        image={this.state.image}
        alt="Image Story"
        x={this.state.storyImageXY.x}
        y={this.state.storyImageXY.y}
        draggable
        onDragEnd={(e) => {
          this.setState({
            storyImageXY: {
              x: e.target.x(),
              y: e.target.y(),
            },
          });
        }}
        scaleX={size}
        scaleY={size}
        rotation={this.props.imageRotate[0]}
      />
    );
  }
}

// function StoryImage({
//   imageSize,
//   imageRotate,
//   imageToStory,
//   imageRef,
//   imageTop,
//   imageLeft,
// }) {
//   // const [{ isDragging }, dragRef] = useDrag({
//   //   type: ItemTypes.IMAGE,
//   //   item: { imageTop, imageLeft },
//   //   collect: (monitor) => ({
//   //     isDragging: monitor.isDragging(),
//   //   }),
//   // });

//   const [storyImageXY, setstoryImageXY] = useState({
//     x: 0,
//     y: 0,
//   });

//   const [image] = useImage(imageToStory);
//   return <Image Image={image} />;
//   // return (
//   //   <Styled.StoryImageContainer
//   //     isDragging={isDragging}
//   //     ref={dragRef}
//   //     style={{
//   //       transform: `scale(${imageSize / 10}) rotate(${
//   //         imageRotate[0]
//   //       }deg) translate3d(${imageLeft}px, ${imageTop}px, 0) `,
//   //     }}
//   //   >
//   //     <img ref={imageRef} src={imageToStory} />
//   //   </Styled.StoryImageContainer>
//   // );
// }

export default StoryImage;
