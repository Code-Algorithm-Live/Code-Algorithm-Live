'use-client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import TextInput from '@/components/Common/TextInput';
import QuillEditor from '@/components/Common/TextEditor/QuillEditor';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
import styles from '@/components/Help/index.module.scss';

function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [problemNumber, setProblemNumber] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const handleSubmit = () => {
    if (inputRef.current) {
      // post로 서버에 전송 & 주스탠드 저장
    }
  };

  return (
    <>
      <div className={styles.all}>
        <div className={styles.form}>
          <p className={styles.title}>도움 요청하기</p>
          <TextInput
            inputSort="number"
            ref={inputRef}
            onChange={value => setProblemNumber(value)}
          >
            문제번호*
          </TextInput>
          <TextInput
            inputSort="title"
            ref={inputRef}
            onChange={value => setTitle(value)}
          >
            제목*
          </TextInput>
          <QuillEditor />
          <div className={styles.buttonCon}>
            <Link href={`/help/wait`}>
              <button
                className={styles.helpSubmitButton}
                type="submit"
                onClick={handleSubmit}
              >
                제출
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.linkForm}>
          <LinkPreview />
        </div>
      </div>
    </>
  );
}
export default Form;
