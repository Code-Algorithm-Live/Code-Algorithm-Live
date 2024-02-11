import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { instance } from '@/api/instance';
import QuillEditor from '@/components/Common/TextEditor/QuillEditor';
import TextInput from '@/components/Common/TextInput';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
import styles from '@/components/Help/index.module.scss';
import useDebounce from '@/hooks/useDebounce';
import { HelpDto, RoomUuid, Sender } from '@/types/Help';
import { generateUUID } from '@/utils/uuid';

function Form() {
  const [problemNumber, setProblemNumber] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [middleNumber, setMiddleNumber] = useState<string>('');
  const debouncedNumber = useDebounce(middleNumber, 5000);
  const { data: session } = useSession();
  const [problemNum, setProblemNum] = useState(''); // FIXME: 입력한 문제 번호가 0으로 넘어가는 이슈 해결 위한 임시 값입니다. 이슈 해결 후 삭제 해주세요.

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
  };

  const roomUuid = generateUUID();

  const handleChangeNumber = (num: string) => {
    setMiddleNumber(num);
    setProblemNum(num)
  };
  const handleChangeTitle = (title: string) => {
    setFormTitle(title);
  };

  const handleChangeContent = (content: string) => {
    setFormContent(content);
  };

  const helpDto = {
    num: Number(problemNum),
    title: formTitle,
    content: formContent,
  };

  const handleSubmit = () => {
    const data = {
      sender,
      helpDto,
      roomUuid,
    };

    instance
      .post<FetchRegistHelpRequest>('/help/waitqueue', data)
      // eslint-disable-next-line no-console
      .catch(Err => console.error(Err));

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
          <LinkPreview problemNumber={Number(problemNumber)} />
        </div>
      </div>
    </>
  );
}
export default Form;
