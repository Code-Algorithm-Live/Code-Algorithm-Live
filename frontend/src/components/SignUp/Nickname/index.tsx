import React, { useState, useEffect, ChangeEvent } from 'react';
import NicknameInput from './NicknameInput';

interface UserNameProps {
  userName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onSuceessFetchData: (data: boolean) => void;
}

const Nickname: React.FC<UserNameProps> = ({
  userName,
  inputRef,
  onSuceessFetchData,
}) => {
  const [fetchResult, setfetchResult] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | 0>(0);

  const fetchData = async (text: string) => {
    try {
      // 빈 문자열인 경우 API 호출을 수행하지 않음
      if (text.trim() === '') {
        setfetchResult(true); // 빈 문자열은 중복이 아닌 것으로 간주
        onSuceessFetchData(true);
        return;
      }
      // 중복 확인 요청 api
      const response = await fetch(
        `http://localhost:8080/member/dupcheck/${text}`,
      );

      if (response.ok) {
        const data = (await response.json()) as boolean;

        setfetchResult(data);
        onSuceessFetchData(data);
      }
    } catch (error) {
      setfetchResult(true);
      onSuceessFetchData(true);
    }
  };

  const handleNicknameChange = (text: string) => {
    clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchData(text);
      }, 300),
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleNicknameChange(value);
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 중복검사 실행
    if (inputRef.current) {
      // eslint-disable-next-line no-param-reassign
      inputRef.current.value = userName;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchData(userName);
    }
  }, [userName]);

  return (
    <>
      <NicknameInput
        inputSort="nickname"
        handleInputChange={handleInputChange}
        inputRef={inputRef}
        fetchResult={fetchResult}
        text="닉네임*"
      />
    </>
  );
};

export default Nickname;
