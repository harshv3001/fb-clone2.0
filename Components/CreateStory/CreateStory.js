import { PhotographIcon } from "@heroicons/react/solid";
import * as Styled from "./createStory.style";

function CreateStory({ addImagetoStory, filepickerRef }) {
  return (
    <Styled.CreateStoryWrap>
      <Styled.PhotoStory onClick={() => filepickerRef.current.click()}>
        <Styled.CreateStoryInput>
          <PhotographIcon className="icon2 shadow-xl" />
          <Styled.CreateStoryText>Create a Photo Story</Styled.CreateStoryText>
          <input
            ref={filepickerRef}
            type="file"
            onChange={addImagetoStory}
            hidden
          />
        </Styled.CreateStoryInput>
      </Styled.PhotoStory>
      <Styled.TextStory>
        <Styled.CreateStoryInput>
          <div className="icon2 shadow-xl">Aa</div>
          <Styled.CreateStoryText>Create a text Story</Styled.CreateStoryText>
        </Styled.CreateStoryInput>
      </Styled.TextStory>
    </Styled.CreateStoryWrap>
  );
}

export default CreateStory;
