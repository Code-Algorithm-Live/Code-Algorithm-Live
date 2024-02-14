import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { instance } from '@/api/instance';
import QuillEditor from '@/components/Common/TextEditor/QuillEditor';
import TextInput from '@/components/Common/TextInput';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/components/Help/index.module.scss';
import useDebounce from '@/hooks/useDebounce';
import { HelpDto, RoomUuid, Sender } from '@/types/Help';
import { generateUUID } from '@/utils/uuid';
import HistorySideBar from '@/components/Common/HistorySideBar';
import useProblemNumberStore from '@/store/problemNumber';
import useProblemInfoStore from '@/store/problemInfo';
import useStopwatchStore from '@/store/stopWatch';
import useHelpRequestStore from '@/store/helpRequest';

function Form() {
  const { data: session } = useSession();
  const [problemNumber, setProblemNumber] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [middleNumber, setMiddleNumber] = useState<string>('');
  const { setZustandProblemNumber } = useProblemNumberStore();
  const { setZustandTitle, setZustandContent } = useProblemInfoStore();
  const { setZustandStartTime } = useStopwatchStore();
  const { removeHelpRequestTime } = useHelpRequestStore();
  const debouncedNumber = useDebounce(middleNumber, 2000);
  const [problemNum, setProblemNum] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  type FetchRegistHelpRequest = {
    sender: Sender;
    helpDto: HelpDto;
    roomUuid: RoomUuid;
  };

  const sender = {
    email: session?.user?.email,
    image: session?.user?.image,
    kakaoname: session?.user?.kakaoName,
    solvedId: session?.user?.SolvedId,
    nickname: session?.user?.name,
    exp: session?.user?.userExp,
  };

  const roomUuid = generateUUID();

  const handleChangeNumber = (num: string) => {
    setMiddleNumber(num);
    setProblemNum(num);
    if (parseInt(num, 10) >= 1000 && parseInt(num, 10) <= 31401) {
      setLoading(true);
    }
  };
  const handleChangeTitle = (title: string) => {
    setFormTitle(title);
  };

  const handleChangeContent = (content: string) => {
    setFormContent(content);
  };

  const helpDto = {
    num: Number(problemNumber),
    title: formTitle,
    content: formContent,
  };

  const isSubmitDisabled =
    !(parseInt(problemNum, 10) >= 1000 && parseInt(problemNum, 10) <= 31401) ||
    formTitle.trim() === '' ||
    formContent.trim() === '';

  const handleSubmit = () => {
    const nowTime: number = Date.now();
    setZustandTitle(formTitle);
    setZustandContent(formContent);
    setZustandProblemNumber(problemNumber);
    setZustandStartTime(nowTime);
    removeHelpRequestTime();

    const data = {
      sender,
      helpDto,
      roomUuid,
    };

    // FIXME: 500에러
    instance
      .post<FetchRegistHelpRequest>('/help/waitqueue', data)
      // eslint-disable-next-line no-console
      .catch(Err => console.error(Err));

    // TODO: 페이지 이동
    router.push('/help/wait');
  };

  useEffect(() => {
    setProblemNumber(debouncedNumber);
    setLoading(false);
  }, [debouncedNumber]);

  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.sideBar}>
          <HistorySideBar></HistorySideBar>
        </div>
        <div className={styles.all}>
          <div className={styles.form}>
            <p className={styles.title}>도움 요청하기</p>
            <TextInput inputSort="number" onChange={handleChangeNumber}>
              문제번호*
            </TextInput>
            <TextInput inputSort="title" onChange={handleChangeTitle}>
              제목*
            </TextInput>
            <QuillEditor onChange={handleChangeContent} />
          </div>
          <div>
            <div className={styles.linkForm}>
              <LinkPreview
                problemNumber={Number(problemNumber)}
                loading={loading}
              />
            </div>
            <div className={styles.buttonCon}>
              <button
                className={styles.helpSubmitButton}
                type="submit"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                제출
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Form;
