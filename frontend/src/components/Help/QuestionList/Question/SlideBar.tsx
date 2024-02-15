import { styled } from 'styled-components';
import styles from '@/components/Help/QuestionList/Question/SlideBar.module.scss';

interface SlideBarFillProps {
  fill: string;
}

const SlideBarFill = styled.div<SlideBarFillProps>`
  width: ${props => props.fill};
  height: 20px;
  border-radius: 10px;
  background-color: var(--white-hover-color);
`;

interface ISlideBar {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const SlideBar = ({ totalPage, page, setPage }: ISlideBar) => {
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
    <div className={styles.barContainer}>
      <div className={styles.positionFix}>
        <SlideBarFill
          fill={`${((page - 1) / (totalPage - 1)) * 100}%`}
        ></SlideBarFill>
        <input
          className={styles.SlideBar}
          id="page"
          type="range"
          step="1"
          value={page}
          onChange={e => handlePageChange(Number(e.target.value))}
          min="1"
          max={totalPage}
        />
      </div>
    </div>
  );
};

export default SlideBar;
