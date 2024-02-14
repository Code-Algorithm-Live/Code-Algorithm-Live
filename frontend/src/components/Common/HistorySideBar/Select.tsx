import React from 'react';
import styled from 'styled-components';

const StyledSelectContainer = styled.select`
  padding-left: 5px;
  width: 100%;
  height: 30px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: box-shadow 0.5s;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 0 0 1px transparent;

  &:hover {
    box-shadow: 0 0 0 1px var(--main-color);
  }
`;

const StyledOption = styled.option`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 300;
`;

interface SelectProps {
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ selectedValue, onChange }) => {
  return (
    <StyledSelectContainer value={selectedValue} onChange={onChange}>
      <StyledOption value="question">질문 히스토리</StyledOption>
      <StyledOption value="answer">답변 히스토리</StyledOption>
    </StyledSelectContainer>
  );
};

export default Select;
