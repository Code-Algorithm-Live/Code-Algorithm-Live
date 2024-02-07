import { useEffect, useState } from 'react';
import Link from 'next/link';
import TextInput from '@/components/Common/TextInput';
import QuillEditor from '@/components/Common/TextEditor/QuillEditor';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
import styles from '@/components/Help/index.module.scss';
import { generateUUID } from '@/utils/uuid';
import { HelpDto, RoomUuid, Sender } from '@/types/Help';
import useDebounce from '@/hooks/useDebounce';
// import { useSession } from 'next-auth/react';

function Form() {
  const [problemNumber, setProblemNumber] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [middleNumber, setMiddleNumber] = useState<string>('');
  const debouncedNumber = useDebounce(middleNumber, 5000);
  // const { data: session } = useSession();

  // FIXME: 세션 해결하기, eslint 무시 처리해도 .kakaoName과 SolvedId type 문제로 일단 주석처리
  // const sender = {
  //   email: session?.user?.email,
  //   image: session?.user?.image,
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   // kakaoname: session?.user?.kakaoName,
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   // solvedId: session?.user?.SolvedId,s
  //   nickname: session?.user?.name,
  // };

  const sender = {
    email: 's98',
    image: 's',
    kakaoname: 's',
    nickname: 's',
    solvedId: 's',
  };

  const roomUuid = generateUUID();

  const handleChangeNumber = (num: string) => {
    // setProblemNumber(num);
    setMiddleNumber(num);
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

  const handleSubmit = async () => {
    const data = {
      sender,
      helpDto,
      roomUuid,
    } as unknown as FetchRegistHelpRequest;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchRegistHelp = async (data: FetchRegistHelpRequest) => {
      const request = await axios
        .post<FetchRegistHelpRequest>(
          'http://localhost:8080/help/waitqueue',
          data,
        )
        .then(function helpForm(response) {
          return response.data;
        });
      return request;
    };
    // FIXME: 세션 해결시 없어짐
    await fetchRegistHelp(data);

    /** 로컬 스토리지에 저장 */
    const nowTime: string = Date.now().toString();
    localStorage.setItem('title', formTitle);
    localStorage.setItem('content', formContent);
    localStorage.setItem('problemNumber', problemNumber);
    localStorage.setItem('startTime', nowTime);
    localStorage.setItem('helpRequestTime', '0');
  };

  useEffect(() => {
    setProblemNumber(debouncedNumber);
  }, [debouncedNumber]);

  return (
    <>
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
          <div className={styles.buttonCon}>
            <Link href={`/help/wait`}>
              <button
                className={styles.helpSubmitButton}
                type="submit"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSubmit}
              >
                제출
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.linkForm}>
          <LinkPreview />
        </div>
      </div>
    </>
  );
}
export default Form;
