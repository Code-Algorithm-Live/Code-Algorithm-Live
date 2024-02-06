import styled from 'styled-components';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import Icon from '@/components/Help/QuestionList/Icon';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const PageButton = styled.button<{ current: boolean }>`
  padding: 5px 10px;
  background-color: ${props =>
    props.current ? 'var(--main-color)' : 'var(--white-color)'};
  color: ${props =>
    props.current ? 'var(--white-color)' : 'var(--foreground-rgb)'};
  border: 1px solid var(--background-start-rgb);
  border-radius: 5px;
  cursor: pointer;
`;
interface IPagination {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}
/** 총 페이지  */
const Pagination = ({ totalPage, page, setPage }: IPagination) => {
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
        icon={FaAngleDoubleLeft}
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
      />
      <Icon
        icon={FaAngleLeft}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      />
      <ButtonWrapper>
        {pageNumbers.map(pageNumber => (
          <PageButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            current={pageNumber === page}
          >
            {pageNumber}
          </PageButton>
        ))}
      </ButtonWrapper>
      <Icon
        icon={FaAngleRight}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPage}
      />
      <Icon
        icon={FaAngleDoubleRight}
        onClick={() => handlePageChange(totalPage)}
        disabled={page === totalPage}
      />
    </PaginationWrapper>
  );
};

export default Pagination;
