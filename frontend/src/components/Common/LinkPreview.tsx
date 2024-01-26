// import BojLogo from '';
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from './LinkPreview.module.css';

// type LinkPreviewProps = {
//   id: string;
//   title: string;
//   level: number;
//   description: string;
//   tags: string[];
// };

// const fetchData = async () => {
//   try {
//     const response = await axios.get('url작성필요');
//     return response;
//   } catch (error: any) {
//     throw new Error(`${error.response.status}에러발생`);
//   }
// };

// interface ProblemData {
//   id: string;
//   title: string;
//   level: number;
//   description: string;
//   tags: string[];
// }
// function LinkPreview({ problemNumber }: { problemNumber: number }) {
//   const { data, isLoading, isError, error } = useQuery(
//     'problemData',
//     apiTest(),
//   );

//   const url: string = `https://www.acmicpc.net/problem/${problemNumber}`;
//   const handleClick = () => {
//     window.open(url, '_blank');
//   };

//   if (isLoading) {
//     return <div>Loading</div>;
//   }
//   if (isError) {
//     return <div>Loading..</div>;
//   }
//   return (
//     <div onClick={handleClick}>
//       <p>{data.title}</p>
//       <img src="/images/Boj_logo.png" alt={data.id} />
//       <p>{data.description}</p>
//     </div>
//   );
// }

// export default LinkPreview;

function LinkPreview() {
  const data = {
    id: 1000,
    title: 'A+B',
    accepted_user_count: 276511,
    level: 1,
    give_no_rating: false,
    average_tries: 2.5356,
    description:
      '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.',
    tags: ['구현', '사칙연산', '수학'],
  };

  const url: string = `https://www.acmicpc.net/problem/${data.id}`;
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div onClick={handleClick} className={styles.LinkPreview}>
        <p>{data.title}</p>
        <img src="images/Boj_logo.png" alt={data.title}></img>
        <p>{data.description}</p>
        <p>
          {data.tags.map((tag, index) => (
            <span key={index}> #{tag}&nbsp;&nbsp; </span>
          ))}
        </p>
      </div>
      {/* <div className={styles.toggle_button_cover}>
        <div className={styles.button_cover}>
          <div className={styles.button_r} id="button-1">
            <input type="checkbox" className={styles.checkbox} />
            <div className={styles.knobs}></div>
            <div className={styles.layer}></div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default LinkPreview;

// {
//     "id": 1000,
//     "title": "A+B",
//     "accepted_user_count": 276511,
//     "level": 1,
//     "give_no_rating": false,
//     "average_tries": 2.5356,
//     "description": "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
//     "tags": [
//         "구현",
//         "사칙연산",
//         "수학"
//     ]
// }
