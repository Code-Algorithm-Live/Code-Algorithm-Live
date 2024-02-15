import { useState } from 'react';
import styled from 'styled-components';
import { HelpForm } from '@/types/Help';
import QuestionModal from '@/components/Chat/QuestionBanner/QuestionModal';

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

const QuestionBanner = ({ helpForm }: { helpForm?: HelpForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickShowMore = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        modalData={helpForm}
      />
    </>
  );
};

export default QuestionBanner;
