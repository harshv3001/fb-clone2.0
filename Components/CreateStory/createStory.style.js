import styled from "styled-components";

export const Container = styled.div`
  min-height: inherit;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
`;

export const CreateStoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 460px;
`;

export const CreateStory = styled.div`
  background-image: url("/createStories/create-stories.png");
  background-size: auto;
  width: 220px;
  height: 330px;
  background-repeat: no-repeat;
  display: inline-block;
  filter: brightness(100%);

  &:hover {
    filter: brightness(95%);
  }
`;

export const PhotoStory = styled(CreateStory)`
  background-position: 0px 0px;
`;

export const TextStory = styled(CreateStory)`
  background-position: 0px -331px;
`;

export const CreateStoryInput = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const CreateStoryText = styled.div`
  color: white;
  margin-top: 10px;
  font-size: small;
  font-weight: bold;
`;

export const CreateStoryScreenContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 56px 32px 24px;
  max-width: calc(100% - 48px);
  min-height: 0;
  height: 100%;
  border-radius: 8px;
  flex-shrink: 1;
  width: 972px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2); ;
`;

export const CreateStoryBlackContainer = styled.div`
  flex-grow: 1;
  margin: 16px;
  overflow-y: hidden;
  border-radius: 8px;
  background-color: #18191a;
  display: flex;
  overflow: hidden;
`;

export const StoryPreviewOutsideContainer = styled.div`
  height: calc(100% - 68px);
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 16px;
`;
export const ImageCustomize = styled.div`
  height: 52px;
  background-color: #18191a;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 2;
  width: 100%;
  pointer-events: all;
  bottom: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;

export const StoryPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  height: 100%;
  border: 2px solid white;
  border-radius: 10px;
`;
export const StoryImageContainer = styled.div`
  cursor: pointer;
  z-index: 100;
`;

export const RotateButton = styled.button`
  background-color: rgba(229, 231, 235, 1);
  filter: brightness(100%);
  &:hover {
    filter: brightness(95%);
  }
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 6px;
`;

export const InputAddTextContainer = styled.div`
  position: absolute;
  top: 13.2rem;
  z-index: 3;
  width: 23rem;
`;
export const InputAddTest = styled.textarea`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  width: 100%;
  height: auto;
  text-align: center;
  color: white;
  caret-color: white;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  resize: none;
  &:focus {
    outline: none;
  }
  background: transparent;

  &::placeholder {
    color: white;
    opacity: 0.9;
  }
`;

export const InputText = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
`;
