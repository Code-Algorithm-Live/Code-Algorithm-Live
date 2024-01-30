import { ChangeEvent, useEffect, useState } from 'react';
import styles from './NicknameInput.module.css';

type NicknameInputProps = {
  inputSort: string;
  children: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  fetchResult: boolean;
};

function NicknameInput({
  inputSort,
  children,
  handleInputChange,
  inputRef,
  fetchResult,
}: NicknameInputProps) {
  const cleanChildren = children.endsWith('*')
    ? children.slice(0, -1)
    : children;

  const charCode = children.charCodeAt(cleanChildren.length - 1);
  const consonantCode = (charCode - 44032) % 28;
  const duplicated = (
    <p className={styles.duplicated}>이미 사용 중인 닉네임입니다.</p>
  );
  const unique = <p className={styles.unique}>사용 가능한 닉네임입니다.</p>;
  const [borderStyle, setBorderStyle] = useState<string>(
    fetchResult
      ? '1px solid var(--important-color)'
      : '1px solid var(--connect-color)',
  );

  let sentence: string = cleanChildren;
  if (consonantCode === 0) {
    sentence = `${cleanChildren}를 입력해주세요`; // 조사 수정
  } else {
    sentence = `${cleanChildren}을 입력해주세요`;
  }

  useEffect(() => {
    // fetchResult 값이 변경될 때마다 borderStyle 업데이트
    setBorderStyle(
      fetchResult
        ? '1px solid var(--important-color)'
        : '1px solid var(--connect-color)',
    );
  }, [fetchResult]);

  return (
    <div className={styles.helpform}>
      <p className={styles.formSort}>
        <label htmlFor={inputSort}>
          {cleanChildren}
          {children.endsWith('*') && <a className={styles.star}>*</a>}
        </label>
      </p>
      <input
        style={{ border: borderStyle }}
        className={styles.formContents}
        type="text"
        id={inputSort}
        placeholder={sentence}
        ref={inputRef}
        onChange={handleInputChange}
      ></input>
      {fetchResult ? duplicated : unique}
    </div>
  );
}

export default NicknameInput;
