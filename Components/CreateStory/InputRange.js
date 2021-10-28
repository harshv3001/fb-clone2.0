import styled from "styled-components";

function InputRange({ value, maxValue, minValue, UpdateChange }) {
  return (
    <div className="mt-2">
      <RangeInput
        type="range"
        id="range"
        value={value}
        max={maxValue}
        min={minValue}
        onInput={UpdateChange}
        onChange={UpdateChange}
      />
    </div>
  );
}

export default InputRange;

const RangeInput = styled.input`
  width: 326px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 50px;
    height: 50px;
    border-radius: 10%;
    background: white;
    cursor: pointer;
  }
`;
