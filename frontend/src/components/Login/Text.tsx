'use client';

import React, { useEffect, useState } from 'react';
import styles from './Text.module.scss';

const texts = [
  { left: '코', right: '드' },
  { left: '알', right: '고리즘' },
  { left: '라', right: '이브' },
];

export default function Text() {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationStarted(true);
    }, 1500);
  }, []);

  return (
    <div
      className={`${styles['text-container']} ${animationStarted ? 'animate' : ''})`}
    >
      {texts.map((text, index) => (
        <div key={index} className={styles['text-animation']}>
          <div className={styles['left-container']}>
            <div className={styles.left}>{text.left}</div>
          </div>
          <div className={styles['right-container']}>
            <div className={styles.right}>{text.right}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
