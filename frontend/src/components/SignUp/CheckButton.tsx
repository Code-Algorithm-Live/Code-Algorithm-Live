import { styled } from 'styled-components';

interface CheckButtonProps {
  isDisabled: boolean;
  clickModal: () => void;
}
const ExtentionButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: var(--main-color);
  color: var(--white-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 5px;
  &:disabled {
    opacity: 40%;
  }

  &:not(:disabled):hover {
    background-color: var(--main-hover-color);
  }
`;

const CheckButton: React.FC<CheckButtonProps> = ({
  isDisabled,
  clickModal,
}) => {
  return (
    <>
      <ExtentionButton disabled={isDisabled} onClick={clickModal}>
        확인
      </ExtentionButton>
    </>
  );
};

export default CheckButton;
