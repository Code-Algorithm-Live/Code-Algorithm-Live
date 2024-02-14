import styles from '@/components/Help/QuestionList/Question/SlideBar.module.scss';

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
    <div>
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
  );
};

export default SlideBar;
