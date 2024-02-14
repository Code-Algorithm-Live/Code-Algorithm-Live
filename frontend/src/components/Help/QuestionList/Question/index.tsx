'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { instance } from '@/api/instance';
import QuestionCodeEditor from '@/components/Help/QuestionList/Question/QuestionCodeEditor';
import QuestionChatting from '@/components/Help/QuestionList/Question/QuestionChatting';
import MoveButton from '@/components/Help/QuestionList/Question/MoveButton';
import SlideBar from '@/components/Help/QuestionList/Question/SlideBar';
import { HistoryDto, MessageDto, ChatRoomInfo } from '@/types/HelpHistory';
import styles from '@/components/Help/QuestionList/Question/index.module.scss';
// import useProblemNumberStore from '@/store/problemNumber';
import NavBar from '@/components/Help/NavBar';

type IHistoryHelp = {
  historyDto: HistoryDto[];
  messageDto: MessageDto[];
};

const initHistory: HistoryDto[] = [
  {
    idx: 0,
    pre: '',
    next: '',
    time: '2024-02-12T03:18:22.7195703',
  },
];
const initMessage: MessageDto[] = [
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
];
/**
 * 문제 번호, 질문 번호, 제목, 내용, 질문자 닉네임은 히스토리 들어오려고 클릭하면 hitstoryProblem.ts(스토어)에 들어가도록 해놓음. 필요 시 사용
 */

function Form() {
  // const { zustandProblemNumber } = useProblemNumberStore();
  const params = useSearchParams();
  const roomId = params.get('roomId');
  const [messageHistory, setMessageHistory] =
    useState<MessageDto[]>(initMessage);
  const [historyHistory, setHistoryHistory] =
    useState<HistoryDto[]>(initHistory);
  const [sender, setSender] = useState('');

  useEffect(() => {
    if (roomId && typeof roomId === 'string') {
      instance
        .get<IHistoryHelp>(`/chat/history/${roomId}`)
        .then(({ data }) => {
          const {
            historyDto,
            messageDto,
          }: { historyDto: HistoryDto[]; messageDto: MessageDto[] } = data;
          setMessageHistory(messageDto);
          setHistoryHistory(historyDto);
        })
        // eslint-disable-next-line no-console
        .catch(Error => console.log(Error));
    }
  }, [roomId]);

  useEffect(() => {
    instance
      .get<ChatRoomInfo>(`/chat/room/${roomId}`)
      .then(({ data }: { data: ChatRoomInfo }) => {
        setSender(data.sender);
      })
      // eslint-disable-next-line no-console
      .catch(Error => console.error(Error));
  }, [roomId]);

  const messageSender = sender;

  const [currentPage, setCurrentPage] = useState(1);
  const historyPage = historyHistory.length;
  const messagePage = messageHistory.length;
  const totalPage = historyPage + messagePage;
  // const totalPage = 5;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 코드는 코드대로, 채팅은 채팅대로, 합쳐서 순서만 따로 나타내는 것
  // 전체 순서 [][0] 코드 [][1] 채팅 인덱스
  const order: number[][] = [];
  // 코드는 누적 합
  const History: string[] = [];
  // 채팅은 그때그때 [][0] = sender, [][1] 메세지
  const Message: string[][] = [];

  // 값 넣기(값 넣기는 한 번만 하고 싶은데, 재렌더링 계속 말고)
  order.push([]);
  if (historyHistory[0].time >= messageHistory[0].date) {
    order[0][0] = -1;
    order[0][1] = 0;
  } else {
    order[0][0] = 0;
    order[0][1] = -1;
  }
  for (let i = 1; i < totalPage; i += 1) {
    order.push([]);
    // TODO: 인덱스 넘어가지 않도록, 읽을 때, -1은 무시 필요
    if (order[i - 1][0] === historyPage - 1) {
      const [tmpSender] = order[i - 1];
      order[i][0] = tmpSender;
      order[i][1] = order[i - 1][1] + 1;
      continue;
    }
    if (order[i - 1][1] === messagePage - 1) {
      const [, text] = order[i - 1];
      order[i][1] = text;
      order[i][0] = order[i - 1][0] + 1;
      continue;
    }
    // console.log(order[i - 1][1] + 1);
    if (
      historyHistory[order[i - 1][0] + 1].time >=
      messageHistory[order[i - 1][1] + 1].date
    ) {
      const [preCode] = order[i - 1];
      order[i][0] = preCode;
      order[i][1] = order[i - 1][1] + 1;
    } else {
      order[i][0] = order[i - 1][0] + 1;
      const [, preChat] = order[i - 1];
      order[i][1] = preChat;
    }
  }
  History[0] = historyHistory[0].next;
  for (let i = 1; i < historyPage; i += 1) {
    const { idx } = historyHistory[i];
    const word = historyHistory[i].next;
    const replace = historyHistory[i].pre.length;
    if (historyHistory[i].pre === '') {
      // 추가
      History[i] =
        History[i - 1].slice(0, idx) + word + History[i - 1].slice(idx);
    } else {
      // 교체
      History[i] =
        History[i - 1].slice(0, idx) +
        word +
        History[i - 1].slice(idx + replace);
    }
  }
  for (let i = 0; i < messagePage; i += 1) {
    Message.push([]);
    Message[i][0] = messageHistory[i].sender;
    Message[i][1] = messageHistory[i].message;
  }

  // props로 보내줄 Message 배열 복사
  const n: number = currentPage - 1;
  const messageProps: string[][] = Message.slice(0, n);
  // currentPage = 순서 배열의 인덱스(채팅배열, 코드배열 인덱스 가지고 있음)-2차원 배열
  // 그에 맞게 출력

  // 현재페이지에 맞는 데이터값 파악(ex- 메세지 몇 번째, 히스토리 몇 번째)
  //    양 데이터 초기값 시간 비교

  return (
    <div>
      <NavBar sort="질문히스토리 보기"></NavBar>
      <div className={styles.questionContainer}></div>
      <div className={styles.allContainer}>
        <div className={styles.historyContainer}>
          <div className={styles.codeEditor}>
            <QuestionCodeEditor
              initialData={History[order[currentPage - 1][0]]}
            />
          </div>
          <div>
            <QuestionChatting
              messageProps={messageProps}
              messageSender={messageSender}
            />
          </div>
        </div>
        <div className={styles.pageContainer}>
          <MoveButton
            totalPage={totalPage}
            limit={1}
            page={currentPage}
            setPage={handlePageChange}
          />

          <SlideBar
            totalPage={totalPage}
            page={currentPage}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
