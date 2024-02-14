import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import 'react-quill/dist/quill.snow.css'; // 테마 스타일
import './QuilEditor.scss';

type TInputEditor = {
  onChange: (value: string) => void;
};

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditor = ({ onChange }: TInputEditor) => {
  // const QuilRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['code-block', 'blockquote', 'bold', 'italic', 'underline', 'strike'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ],
      },
    }),
    [],
  );

  const handleContentChange = (content: string) => {
    setContents(content);
    onChange(content);
  };
  return (
    <div className={'content'}>
      <ReactQuill
        className={'editor'}
        // ref={element => {
        //   if (element !== null) {
        //     QuilRef.current = element;
        //   }
        // }}
        value={contents}
        // onChange={setContents}
        onChange={handleContentChange}
        modules={modules}
        theme="snow"
        placeholder="질문을 입력해주세요"
      />
    </div>
  );
};

export default QuillEditor;
