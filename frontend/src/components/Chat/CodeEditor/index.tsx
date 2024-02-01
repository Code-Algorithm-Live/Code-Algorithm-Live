'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactCodeMirror, { EditorView, ViewUpdate } from '@uiw/react-codemirror';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { java } from '@codemirror/lang-java';
import yorkie from 'yorkie-js-sdk';

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const editorTheme = EditorView.theme({
  /* 스크롤 스타일 */
  '.cm-scroller::-webkit-scrollbar': {
    width: '8px',
  },
  '.cm-scroller::-webkit-scrollbar-thumb': {
    background: 'var(--editorSub, #343746)',
  },
  '.cm-scroller::-webkit-scrollbar-track': {
    background: 'var(--editorBlack, #282a36)',
  },
});

const yorkieBaseURL = 'https://api.yorkie.dev'; // 'http://localhost:3000';
const YORKIE_API_KEY = 'cmtk19dafcg8gj9haj0g';
const DOC_KEY = 'hamster';
const DOC_NAME = 'hamster';

const CodeEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('');
  const yorkieClient = useRef(
    new yorkie.Client(yorkieBaseURL, {
      apiKey: YORKIE_API_KEY,
    }),
  );
  const docRef = useRef(new yorkie.Document(DOC_KEY));

  // 코드 에디터의 최대 높이를 렌더링된 사이즈만큼 지정합니다.
  useEffect(() => {
    if (!ref.current) return;
    setMaxHeight(`${ref.current.offsetHeight - 10}px`);
  }, []);

  useEffect(() => {
    if (yorkieClient.current.isActive()) return;
    // yorkie클라이언트 실행
    const startPairProgramming = async () => {
      await yorkieClient.current.activate();
      // await yorkieClient.current.attach(docRef.current);
      console.log('요끼시작', yorkieClient.current.isActive());
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startPairProgramming();
  }, []);

  const handleChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    console.log('value:', value);
    console.log('viewUpdate: ', viewUpdate);
  }, []);

  return (
    <Container ref={ref}>
      <ReactCodeMirror
        theme={atomone}
        maxHeight={maxHeight}
        extensions={[java(), editorTheme]}
        onChange={handleChange}
      />
    </Container>
  );
};

export default CodeEditor;
