import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import NicknameInput from './NicknameInput';

interface UserNameProps {
  userName: string;
}

const Nickname: React.FC<UserNameProps> = ({ userName }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fetchResult, setfetchResult] = useState<boolean>(false);

  const fetchData = async (text: string) => {
    try {
      // 빈 문자열인 경우 API 호출을 수행하지 않음
      if (text.trim() === '') {
        setfetchResult(true); // 빈 문자열은 중복이 아닌 것으로 간주
        return;
      }
      // 중복 확인 요청 api
      const response = await fetch(
        `http://localhost:8080/member/dupcheck/${text}`,
      );

      if (response.ok) {
        const data = await response.json();

        setfetchResult(data);
      }
    } catch (error) {
      setfetchResult(true);
    }
  };
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | 0>(0);

  const handleNicknameChange = (text: string) => {
    clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        fetchData(text);
      }, 300),
    );
  };
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleNicknameChange(value);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 userName을 초기값으로 설정 후 중복검사 실행
    if (inputRef.current) {
      inputRef.current.value = userName;
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
      >
        닉네임*
      </NicknameInput>
    </>
  );
};

export default Nickname;
