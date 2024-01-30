import React, { useRef } from 'react';
import SolvedIdInput from './SolvedIdInput';

const SolvedId = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <SolvedIdInput inputSort="Solved.ac ID" inputRef={inputRef}>
        Solved.ac ID*
      </SolvedIdInput>
    </>
  );
};

export default SolvedId;
