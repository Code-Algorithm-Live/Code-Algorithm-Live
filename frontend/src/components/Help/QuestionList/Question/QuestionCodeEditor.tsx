'use client';

import { java } from '@codemirror/lang-java';
import { atomone } from '@uiw/codemirror-theme-atomone';
import ReactCodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useState, useEffect } from 'react';

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

const QuestionCodeEditor = ({ initialData }: { initialData: string }) => {
  const [valueData, setValueData] = useState<string>(initialData);

  useEffect(() => {
    if (initialData !== valueData) {
      setValueData(initialData);
    }
  }, [initialData, valueData]);
  return (
    <div>
      <ReactCodeMirror
        value={valueData}
        theme={atomone}
        height="600px"
        width="100%;"
        extensions={[java(), editorTheme]}
        readOnly={true}
      />
    </div>
  );
};

export default QuestionCodeEditor;
