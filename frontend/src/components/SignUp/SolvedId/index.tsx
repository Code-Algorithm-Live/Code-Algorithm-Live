import SolvedIdInput from './SolvedIdInput';

interface SolveIdProps {
  inputRef: React.RefObject<HTMLInputElement>;
  handleCheckInput: () => void;
}

const SolvedId: React.FC<SolveIdProps> = ({ inputRef, handleCheckInput }) => {
  return (
    <>
      <SolvedIdInput
        inputSort="Solved.ac ID"
        inputRef={inputRef}
        text="Solved.ac ID*"
        handleCheckInput={handleCheckInput}
      ></SolvedIdInput>
    </>
  );
};

export default SolvedId;
