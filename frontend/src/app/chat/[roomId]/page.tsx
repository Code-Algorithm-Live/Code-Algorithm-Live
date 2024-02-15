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
import { HelpForm } from '@/types/Help';
import QuestionModal from '@/components/Chat/QuestionBanner/QuestionModal';

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

const QuestionBannerContainer = styled.div`
  padding: 12px 4px;
  background: var(--editorBlack, #282a36);

  .questionBanner {
    padding: 15px 14px;
    min-width: 310px;
    width: 310px;
    min-height: 88px;
    height: 88px;

    border-radius: 4px;
    background: var(--editorSub, #343746);

    color: var(--editorTypo, #e2e1e1);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.21px;

    .titleContainer {
      margin-bottom: 8px;
      display: flex;

      justify-content: space-between;
      align-items: center;

      .show {
        border: none;

        background: transparent;

        color: var(--link-font-color, #0395ff);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.21px;
      }
    }
    .content {
      display: -webkit-box;
      overflow: hidden;

      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { helpForm } = useHelpFromStore();

  const handleCodeEditorChange = (value: string) => setCode(value);

  const handleRun = (input: string) => {
    // console.log(input);
    if (!code) return;
    if (compileMutation.isPending) return;

    compileMutation.mutate({ code, input });
  };

  const handleClickShowMore = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const modalData = helpForm as HelpForm;

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
              <Timer />

              <div className="lang">
                <select name="" id="">
                  <option value="">java</option>
                  <option value="">python</option>
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
          <QuestionBannerContainer>
            <div className="questionBanner">
              <div className="titleContainer">
                <p
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: helpForm?.helpDto.title as TrustedHTML,
                  }}
                />
                <button className="show" onClick={handleClickShowMore}>
                  더보기
                </button>
              </div>
              <p
                className="content"
                dangerouslySetInnerHTML={{
                  __html: helpForm?.helpDto.content as TrustedHTML,
                }}
              />
            </div>
          </QuestionBannerContainer>
          <div className="chattingContainer">
            <Chatting />
          </div>
        </RightContainer>
      </Container>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        modalData={modalData}
      />
    </>
  );
}
