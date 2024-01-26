import ReactQuill from 'react-quill';
// import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // 테마 스타일
import { useRef, useState, useMemo } from 'react';
import './QuilEditor.scss';

const QuillEditor = () => {
  const QuilRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['code-block', 'blockquote', 'bold', 'italic', 'underline', 'strike'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          // [
          //   { list: 'ordered' },
          //   { list: 'bullet' },
          //   { indent: '-1' },
          //   { indent: '+1' },
          // ],
          ['link'],
        ],
      },
    }),
    [],
  );
  return (
    <div className={'content'}>
      <ReactQuill
        className={'editor'}
        ref={element => {
          if (element !== null) {
            QuilRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="질문을 입력해주세요"
      />
    </div>
  );
};

export default QuillEditor;
