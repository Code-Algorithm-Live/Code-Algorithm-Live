import { useState } from 'react';
import Link from 'next/link';
import TextInput from '@/components/Common/TextInput';
import QuillEditor from '@/components/Common/TextEditor/QuillEditor';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
import styles from '@/components/Help/index.module.scss';
import axios from 'axios';
import { generateUUID } from '@/utils/uuid';
import { HelpDto, RoomUuid, Sender } from '@/types/Help';
// import { useSession } from 'next-auth/react';

function Form() {
  const [problemNumber, setProblemNumber] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  // const { data: session } = useSession();

  type FetchRegistHelpRequest = {
    sender: Sender;
    helpDto: HelpDto;
    roomUuid: RoomUuid;
  };

  // FIXME: 세션 해결하기, eslint 무시 처리해도 .kakaoName과 SolvedId type 문제로 일단 주석처리
  // const sender = {
  //   email: session?.user?.email,
  //   image: session?.user?.image,
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   // kakaoname: session?.user?.kakaoName,
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   solvedId: session?.user?.SolvedId,
  //   nickname: session?.user?.name,
  // };

  // 더미데이터
  const sender = {
    email: 's98415@naver.com',
    image: 's98415@naver.com',
    kakaoname: 's98415@naver.com',
    solvedId: 's98415@naver.com',
    nickname: 's98415@naver.com',
  };

  const roomUuid = generateUUID();

  const handleChangeNumber = (num: string) => {
    setProblemNumber(num);
  };
  const handleChangeTitle = (title: string) => {
    setFormTitle(title);
  };
  /** <p></p> 삭제 */
  const handleChangeContent = (content: string) => {
    setFormContent(content.replace(/<p>/g, '').replace(/<\/p>/g, ''));
  };

  const helpDto = {
    num: Number(problemNumber),
    title: formTitle,
    content: formContent,
  };

  const handleSubmit = async () => {
    // TODO: 주스탠드 저장

    const data = {
      sender,
      helpDto,
      roomUuid,
    };

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
  };

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
