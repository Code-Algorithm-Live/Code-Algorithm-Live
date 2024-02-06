import { useState, useRef } from 'react';
import styles from './TextInput.module.css';

type TInputProps = {
  inputSort: string;
  children: string;
  onChange: (value: string) => void;
};

function TextInput({ inputSort, children, onChange }: TInputProps) {
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

  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

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
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default TextInput;
