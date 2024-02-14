'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { instance } from '@/api/instance';
import styles from '@/components/Help/Edit/index.module.scss';
import { HelpDto, RoomUuid, Sender } from '@/types/Help';
import { generateUUID } from '@/utils/uuid';
import NumberInput from '@/components/Help/Edit/NumberInput';
import TitleInput from '@/components/Help/Edit/TitleInput';
import ContentQuillEditor from '@/components/Help/Edit/ContentQuillEditor';
import LinkPreview from '@/components/Help/Wait/LinkPreview';
import HistorySideBar from '@/components/Common/HistorySideBar';
import useProblemNumberStore from '@/store/problemNumber';
import useProblemInfoStore from '@/store/problemInfo';

function Form() {
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const { data: session } = useSession();
  const { zustandProblemNumber } = useProblemNumberStore();
  const { setZustandTitle, setZustandContent } = useProblemInfoStore();

  const router = useRouter();

  const problemNumber = zustandProblemNumber;

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

  const helpDto = {
    num: Number(problemNumber),
    title: formTitle,
    content: formContent,
  };

  /** problemNumber 없을 시 입력페이지로 이동 */
  useEffect(() => {
    if (!problemNumber) {
      router.push(`/help`);
    }
  }, [problemNumber, router]);

  const handleChangeTitle = (title: string) => {
    setFormTitle(title);
  };

  const handleChangeContent = (content: string) => {
    setFormContent(content);
  };
  const handleUpdate = () => {
    setZustandTitle(formTitle);
    setZustandContent(formContent);

    const data = {
      sender,
      helpDto,
      roomUuid,
    };

    instance
      .put<FetchRegistHelpRequest>('/help/waitqueue', data)
      // eslint-disable-next-line no-console
      .catch(Error => console.error(Error));
  };
  return (
    <div className={styles.allContainer}>
      <div className={styles.sideBar}>
        <HistorySideBar></HistorySideBar>
      </div>
      <div className={styles.buttonPlace}>
        <div className={styles.all}>
          <div className={styles.form}>
            <p className={styles.title}>도움 요청하기 수정</p>
            {problemNumber && <NumberInput problemNumber={problemNumber} />}
            <TitleInput onChange={handleChangeTitle} />
            <ContentQuillEditor onChange={handleChangeContent} />
          </div>

          <div className={styles.linkForm}>
            <LinkPreview
              problemNumber={Number(problemNumber)}
              loading={false}
            />
            <div className={styles.buttonCon}>
              <Link href={`/help/wait`}>
                <button className={styles.editPageButton}>뒤로가기</button>
              </Link>
              <Link href={`/help/wait`}>
                <button
                  className={styles.editPageButton}
                  onClick={handleUpdate}
                >
                  확인
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
