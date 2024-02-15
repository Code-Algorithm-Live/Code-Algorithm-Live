'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { fetchPostCompiler } from '@/api/chat';
import Chatting from '@/components/Chat/Chatting';
import CodeEditor from '@/components/Chat/CodeEditor';
import InputOutput from '@/components/Chat/InputOutput';
import ProblemView from '@/components/Chat/ProblemView';
import Timer from '@/components/Chat/Timer';
import useHelpFromStore from '@/store/helpForm';
import QuestionBanner from '@/components/Chat/QuestionBanner';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  height: 100dvh;
`;

const PairProgrammingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 66px;
  padding: 25px 20px;

  border-right: 1px solid var(--editorBlack, #282a36);
  background: var(--editorSub, #343746);

  .title {
    color: var(--editorTypo, #e2e1e1);
  }

  .menu {
    display: flex;
    gap: 14px;

    .lang {
      select {
        padding: 0 10px;
        width: 93px;
        height: 34px;

        border: 1px solid var(--editorPoint, #6072a3);

        background: var(--editorSub, #343746);
        color: var(--editorPoint, #6072a3);
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 403px;

  .problemContainer {
    height: 100%;
    background: var(--editorBlack, #282a36);
  }

  .bottomMenuContainer {
    padding: 12px 14px 18px;
    width: 403px;
    height: 63px;

    border-top: 1px solid var(--editorBlack, #282a36);
    background: var(--editorBlack, #282a36);

    button {
      width: 82px;
      height: 32px;

      border-radius: 4px;
      background: var(--important-hover-color, #c90000);

      color: var(--editorTypo, #e2e1e1);
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;

  background: var(--editorBlack, #282a36);
`;

const CodeEditorContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;

  .chattingContainer {
    flex: 1;
    height: calc(100% - 112px); // 도움 요청 폼 더보기 높이값 뺀 만큼 조정
  }
`;

export default function Chat() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const compileMutation = useMutation({
    mutationFn: fetchPostCompiler,
    onSuccess: ({ data }) => setOutput(data),
  });
  const { helpForm } = useHelpFromStore();

  const handleCodeEditorChange = (value: string) => setCode(value);

  const handleRun = (input: string) => {
    console.log(input);
    if (!code) return;
    if (compileMutation.isPending) return;

    compileMutation.mutate({ code, input });
  };

  return (
    <>
      <Container>
        <PairProgrammingContainer>
          <HeaderContainer>
            <p className="title">
              <span className="rank"></span>
              {helpForm?.helpDto.num} 마법사와 파이어볼
            </p>

            <div className="menu">
              {/* <Timer /> */}
              <div className="lang">
                <select name="" id="">
                  <option value="">java</option>
                </select>
              </div>
            </div>
          </HeaderContainer>
          <MainContainer>
            <LeftContainer>
              <ProblemView />
              <div className="bottomMenuContainer">
                <button>나가기</button>
              </div>
            </LeftContainer>
            <CodeEditorContainer>
              <CodeEditor onChange={handleCodeEditorChange} />
              <InputOutput
                isRunning={compileMutation.isPending}
                onRun={input => handleRun(input)}
                output={output}
              />
            </CodeEditorContainer>
          </MainContainer>
        </PairProgrammingContainer>

        <RightContainer>
          <QuestionBanner helpForm={helpForm} />
          <div className="chattingContainer">
            <Chatting />
          </div>
        </RightContainer>
      </Container>
    </>
  );
}
