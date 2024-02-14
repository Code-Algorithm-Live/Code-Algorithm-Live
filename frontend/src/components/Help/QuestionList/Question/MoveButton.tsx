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
  );
};

export default MoveButton;
