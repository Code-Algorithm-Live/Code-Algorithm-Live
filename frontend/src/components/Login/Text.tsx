'use client';

import React, { useEffect, useState } from 'react';
import './Text.scss';

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
    <div className={`text-container ${animationStarted ? 'animate' : ''}`}>
      {texts.map((text, index) => (
        <div key={index} className="text-animation">
          <div className="left-container">
            <div className="left">{text.left}</div>
          </div>
          <div className="right-container">
            <div className="right">{text.right}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
