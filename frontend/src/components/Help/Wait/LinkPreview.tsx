// import BojLogo from '';
import Image from 'next/image';
import { useState } from 'react';
import styles from './LinkPreview.module.scss';

function LinkPreview() {
  const [sorts, setSorts] = useState('???,???,???');
  const [link, setLink] = useState('relative-0');

  const data = {
    id: 1000,
    title: 'A+B',
    accepted_user_count: 276511,
    level: 1,
    give_no_rating: false,
    average_tries: 2.5356,
    description:
      '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.',
    tags: ['구현', '사칙연산', '수학'],
  };

  const imgurl = `/images/problemLevel/${link}.svg`;
  const handleClickLevel = () => {
    setLink(link === 'relative-0' ? `${data.level}` : 'relative-0');
  };
  const url: string = `https://www.acmicpc.net/problem/${data.id}`;

  const handleClick = () => {
    window.open(url, '_blank');
  };

  const handleClickSort = () => {
    setSorts(sorts === '???,???,???' ? `${data.tags}` : '???,???,???');
  };

  return (
    <div className={styles.linkPreview}>
      <div onClick={handleClick} className={styles.linkBox}>
        <div className={styles.content}>
          <div className={styles.linkTitle}>
            <Image
              src={imgurl}
              alt="level"
              className={styles.levelImg}
              width={12}
              height={12}
            ></Image>
            <a className={styles.title}>&nbsp; {data.title}</a>
          </div>
          <div className={styles.description}>
            <p className={styles.desc}>{data.description}</p>
            <Image
              src="/images/Boj_logo.png"
              alt={data.title}
              className={styles.logo}
              width={76}
              height={76}
            />
          </div>
          <p className={styles.sorting}>
            {sorts.split(',').map((tag, index) => (
              <span key={index}> #{tag}&nbsp;&nbsp; </span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.toggle}>
        <a className={styles.toggleSort}>난이도 보기</a>
        <input
          onClick={handleClickLevel}
          type="checkbox"
          id="switchLevel"
          className={styles.checkbox}
        />
        <label htmlFor="switchLevel" className={styles.switch_label}>
          <span className={styles.onf_btn}></span>
        </label>
        <a className={styles.toggleSort}>알고리즘 보기</a>
        <input
          onClick={handleClickSort}
          type="checkbox"
          id="switchSort"
          className={styles.checkbox}
        />
        <label htmlFor="switchSort" className={styles.switch_label}>
          <span className={styles.onf_btn}></span>
        </label>
      </div>
    </div>
  );
}
export default LinkPreview;