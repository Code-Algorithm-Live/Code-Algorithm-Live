import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  padding: 0 14px;
  width: 100%;
  height: 120px;

  background: var(--editorSub, #343746);
  color: var(--editorTypo, #e2e1e1);

  .Box {
    flex: 1;

    min-width: 252px;
    width: 100%;

    .textContainer {
      margin-bottom: 4px;
    }
    textarea {
      resize: none;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--editorSub, #343746);
      }
      &::-webkit-scrollbar-track {
        background: var(--editorBlack, #282a36);
      }
    }
    .content {
      padding: 9px 6px;
      width: 100%;
      height: 72px;

      background: var(--editorBlack, #282a36);

      font-size: 16px;
      font-weight: 500;
    }

    &.inputBox {
      .textContainer {
        display: flex;
        justify-content: space-between;

        .menu {
          display: flex;
          gap: 4px;

          button {
            display: inline-flex;
            padding: 2px 4px;
            justify-content: center;
            align-items: center;
            gap: 12px;

            border-radius: 4px;
            background: var(--editorBlack, #282a36);

            color: var(--, #f5f5f5);
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.18px;
          }
        }
      }
    }
  }
`;

const InputOutput = () => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  const handleClear = () => {
    setInput('');
  };
  const handleSubmit = () => {
    console.log(input);
  };

  return (
    <Container>
      <div className="Box inputBox">
        <div className="textContainer">
          <p className="text">입력</p>
          <div className="menu">
            <button className="clear" onClick={handleClear}>
              초기화
            </button>
            <button className="run" onClick={handleSubmit}>
              실행
            </button>
          </div>
        </div>

        <textarea
          className="content"
          value={input}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="Box">
        <p className="textContainer">실행결과</p>
        <div className="content output"></div>
      </div>
    </Container>
  );
};

export default InputOutput;
