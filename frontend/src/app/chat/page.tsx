'use client';

import styled from 'styled-components';
import Chatting from '@/components/Chat/Chatting';

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

    .timer-container {
      display: flex;
      align-items: center;
      gap: 14px;

      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.24px;
      color: var(--editorTypo, #e2e1e1);

      .timer {
        & > span {
          margin-right: 4px;
        }
      }

      button {
        width: 86px;
        height: 34px;

        background: var(--editorPoint, #6072a3);
        color: var(--editorSub, #343746);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.21px;
      }
    }

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

  .codeEditore {
    flex: 1;
    width: 100%;
    height: 100%;
  }

  .runContainer {
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
      .content {
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
  }
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
  }
`;

export default function Chat() {
  return (
    <Container>
      <PairProgrammingContainer>
        <HeaderContainer>
          <p className="title">
            <span className="rank"></span>
            16666 마법사와 파이어볼
          </p>

          <div className="menu">
            <div className="timer-container">
              <div className="timer">
                <span>남은시간</span>
                <span>49:57</span>
              </div>
              <button>연장하기</button>
            </div>

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
            <div className="problemContainer"></div>
            <div className="bottomMenuContainer">
              <button>나가기</button>
            </div>
          </LeftContainer>
          <CodeEditorContainer>
            <div className="codeEditore"></div>
            <div className="runContainer">
              <div className="Box inputBox">
                <div className="textContainer">
                  <p className="text">입력</p>
                  <div className="menu">
                    <button className="clear">초기화</button>
                    <button className="run">실행</button>
                  </div>
                </div>

                <textarea className="content"></textarea>
              </div>
              <div className="Box">
                <p className="textContainer">실행결과</p>
                <div className="content output"></div>
              </div>
            </div>
          </CodeEditorContainer>
        </MainContainer>
      </PairProgrammingContainer>

      <RightContainer>
        <QuestionBannerContainer>
          <div className="questionBanner">
            <div className="titleContainer">
              <p className="title">상어시리즈 좋아하시는 분 도와 주세요</p>
              <button className="show">더보기</button>
            </div>
            <p className="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              voluptatum. Aliquam tenetur eveniet doloribus, dolore ex, officiis
              qui laudantium amet incidunt in rem, similique animi dolorum
              suscipit quidem harum iusto? 도와줘어어
            </p>
          </div>
        </QuestionBannerContainer>
        <div className="chattingContainer">
          <Chatting />
        </div>
      </RightContainer>
    </Container>
  );
}
