import styles from './SolvedIdInput.module.css';

type SolvedIdInputProps = {
  inputSort: string;
  text: string;
  inputRef: React.RefObject<HTMLInputElement>;
  handleCheckInput: () => void;
};

function SolvedIdInput({
  inputSort,
  text,
  inputRef,
  handleCheckInput,
}: SolvedIdInputProps) {
  const cleanChildren = text.endsWith('*') ? text.slice(0, -1) : text;

  const charCode = text.charCodeAt(cleanChildren.length - 1);
  const consonantCode = (charCode - 44032) % 28;
  let sentence: string = cleanChildren;
  if (consonantCode === 0) {
    sentence = `${cleanChildren}를 입력해주세요`; // 조사 수정
  } else {
    sentence = `${cleanChildren}을 입력해주세요`;
  }

  return (
    <div className={styles.helpform}>
      <p className={styles.formSort}>
        <label htmlFor={inputSort}>
          {cleanChildren}
          {text.endsWith('*') && <a className={styles.star}>*</a>}
        </label>
      </p>
      <input
        className={styles.formContents}
        type="text"
        id={inputSort}
        placeholder={sentence}
        ref={inputRef}
        onChange={handleCheckInput}
      ></input>
    </div>
  );
}

export default SolvedIdInput;
