import { useRef } from 'react';
import TextInput from '../TextInput';
import QuillEditor from '../QuillEditor';
import LinkPreview from '../LinkPreview';
import styles from './Form.module.scss';

function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputRef.current) {
      //   console.log(inputRef.current.value);
    }
  };

  return (
    <>
      <div className={styles.all}>
        <div className={styles.form}>
          <p className={styles.title}>도움 요청하기</p>
          <TextInput inputSort="number" ref={inputRef}>
            문제번호*
          </TextInput>
          <TextInput inputSort="title" ref={inputRef}>
            제목*
          </TextInput>
          <QuillEditor />
          <div className={styles.buttonCon}>
            <button
              className={styles.helpSubmitButton}
              type="submit"
              onClick={handleSubmit}
            >
              제출
            </button>
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
