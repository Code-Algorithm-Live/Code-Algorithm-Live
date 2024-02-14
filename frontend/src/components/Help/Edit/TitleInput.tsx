import { useState, useRef, useEffect } from 'react';
import styles from '@/components/Help/Edit/TitleInput.module.scss';
import useProblemInfoStore from '@/store/problemInfo';

type TitleProps = {
  onChange: (value: string) => void;
};

function TitleInput({ onChange }: TitleProps) {
  const { zustandTitle } = useProblemInfoStore();
  const title = zustandTitle;
  const initTitle = title || ' ';
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(initTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.helpform}>
      <p className={styles.formSort}>
        <span>제목</span>
        <span className={styles.star}>*</span>
      </p>
      <input
        className={styles.formContents}
        type="text"
        ref={inputRef}
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default TitleInput;
