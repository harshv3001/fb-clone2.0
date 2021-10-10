import styled from "styled-components";
import { PhotographIcon } from "@heroicons/react/solid";

function CreateStoryScreen() {
  return (
    <Container>
      <div className="flex flex-col h-full items-center justify-center">
        <CreateStoryWrap>
          <PhotoStory>
            <CreateStoryInput>
              <PhotographIcon className="icon2 shadow-xl" />
              <CreateStoryText>Create a Photo Story</CreateStoryText>
            </CreateStoryInput>
          </PhotoStory>
          <TextStory>
            <CreateStoryInput>
              <div className="icon2 shadow-xl">Aa</div>
              <CreateStoryText>Create a Text Story</CreateStoryText>
            </CreateStoryInput>
          </TextStory>
        </CreateStoryWrap>
      </div>
    </Container>
  );
}

export default CreateStoryScreen;

const Container = styled.div`
  min-height: inherit;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
`;

const CreateStoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 460px;
`;

const CreateStory = styled.div`
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

const PhotoStory = styled(CreateStory)`
  background-position: 0px 0px;
`;

const TextStory = styled(CreateStory)`
  background-position: 0px -331px;
`;

const CreateStoryInput = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CreateStoryText = styled.div`
  color: white;
  margin-top: 10px;
  font-size: small;
  font-weight: bold;
`;
