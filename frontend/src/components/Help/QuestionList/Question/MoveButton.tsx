import styled from 'styled-components';

import {
  CgChevronDoubleLeftR,
  CgChevronLeftR,
  CgChevronRightR,
  CgChevronDoubleRightR,
} from 'react-icons/cg';
import Icon from '@/components/Help/QuestionList/Icon';

import '@/components/Help/QuestionList/Question/MoveButton.css';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const ButtonContainer = styled.div`
  mafint-top: 18px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-family: Pretendard;
  width: 80%;
  align-items: center;
`;

interface IPagination {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}
/** 총 페이지  */
const MoveButton = ({ totalPage, page, setPage }: IPagination) => {
  const pageNumbers: number[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  /** 페이지 이동 */
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <ButtonContainer>
      <div>start</div>
      <PaginationWrapper>
        <Icon
          icon={CgChevronDoubleLeftR}
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        />
        <Icon
          icon={CgChevronLeftR}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        <Icon
          icon={CgChevronRightR}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPage}
        />
        <Icon
          icon={CgChevronDoubleRightR}
          onClick={() => handlePageChange(totalPage)}
          disabled={page === totalPage}
        />
      </PaginationWrapper>
      <div>end</div>
    </ButtonContainer>
  );
};

export default MoveButton;
