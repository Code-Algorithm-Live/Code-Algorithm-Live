import styles from '@/components/Help/Edit/NumberInput.module.scss';

function NumberInput({ problemNumber }: { problemNumber: string }) {
  return (
    <div className={styles.helpform}>
      <p className={styles.formSort}>
        <span>문제번호</span>
        <span className={styles.star}>*</span>
      </p>
      <input
        className={styles.formContents}
        type="number"
        placeholder={problemNumber}
        disabled
      ></input>
    </div>
  );
}
export default NumberInput;
