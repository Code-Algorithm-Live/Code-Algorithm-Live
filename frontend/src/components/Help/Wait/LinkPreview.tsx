// import BojLogo from '';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IData, IFetchData } from '@/types/Problem';
import styles from './LinkPreview.module.scss';

function LinkPreview({ problemNumber }: { problemNumber: number }) {
  const [sorts, setSorts] = useState('???,???,???');
  const [link, setLink] = useState('relative-0');
  const [problem, setProblem] = useState<IData | null>(null);

  useEffect(() => {
    if (problemNumber !== problem?.id) {
      fetch(`http://localhost:8080/problem/${problemNumber}`)
        .then(response => response.json())
        .then((res: IFetchData) => {
          const data = {
            id: res.id,
            title: res.title,
            level: res.level,
            description: res.description,
            tags: res.tags,
          };
          setProblem(data);
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err));
    }
  }, [problemNumber, problem?.id]);

  if (problem !== null) {
    const imgurl = `/images/problemLevel/${link}.svg`;
    const handleClickLevel = () => {
      setLink(link === 'relative-0' ? `${problem.level}` : 'relative-0');
    };
    const url: string = `https://www.acmicpc.net/problem/${problem.id}`;

    const handleClick = () => {
      window.open(url, '_blank');
    };

    const handleClickSort = () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setSorts(sorts === '???,???,???' ? `${problem.tags}` : '???,???,???');
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
              <a className={styles.title}>&nbsp; {problem.title}</a>
            </div>
            <div className={styles.description}>
              <p className={styles.desc}>{problem.description}</p>
              <Image
                src="/images/Boj_logo.png"
                alt={problem.title}
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
  return <div>nothing</div>;
}
export default LinkPreview;
