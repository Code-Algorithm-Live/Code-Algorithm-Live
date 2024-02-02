import { useRef } from 'react';
import styles from './TextInput.module.css';

type TextInputProps = {
  inputSort: string;
  children: string;
  // ref: HTMLInputElement;
};

function TextInput({ inputSort, children }: TextInputProps) {
  const cleanChildren = children.endsWith('*')
    ? children.slice(0, -1)
    : children;

  const charCode = children.charCodeAt(cleanChildren.length - 1);

  const consonantCode = (charCode - 44032) % 28;

  let sentence: string = cleanChildren;
  if (consonantCode === 0) {
    sentence = `${cleanChildren}를 입력해주세요`; // 조사 수정
  } else {
    sentence = `${cleanChildren}을 입력해주세요`;
  }
  // inputRef.current값으로 현재 input 요소에 접근 가능
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.helpform}>
      <p className={styles.formSort}>
        <label htmlFor={inputSort}>
          {cleanChildren}
          {children.endsWith('*') && <a className={styles.star}>*</a>}
        </label>
      </p>
      <input
        className={styles.formContents}
        type="text"
        id={inputSort}
        placeholder={sentence}
        ref={inputRef}
      ></input>
    </div>
  );
}

export default TextInput;
