import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import useProblemInfoStore from '@/store/problemInfo';
import 'react-quill/dist/quill.snow.css'; // 테마 스타일
import styles from '@/components/Help/Edit/ContentQuillEditor.module.scss';

type TInputEditor = {
  onChange: (value: string) => void;
};

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ContentQuillEditor = ({ onChange }: TInputEditor) => {
  const [contents, setContents] = useState('');
  const { zustandContent } = useProblemInfoStore();

  useEffect(() => {
    const initContent = zustandContent;
    if (initContent) {
      setContents(initContent);
      onChange(initContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className={styles.content}>
      <ReactQuill
        className={styles.editor}
        value={contents}
        onChange={handleContentChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};
export default ContentQuillEditor;
