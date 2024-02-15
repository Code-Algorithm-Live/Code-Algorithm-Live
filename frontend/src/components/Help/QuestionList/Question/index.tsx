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
    idx: 111,
    pre: '      qeqrewtert\n        xcvb\n        fsd\n        h\n        ',
    next: '',
    time: '2024-02-14T07:42:07.368Z',
  },
  {
    idx: 111,
    pre: '\n',
    next: '',
    time: '2024-02-14T07:42:07.619Z',
  },
  {
    idx: 115,
    pre: '',
    next: '  \n    ',
    time: '2024-02-14T07:42:07.654Z',
  },
  {
    idx: 115,
    pre: '  ',
    next: 'dqwdwqdasdasdsadasd',
    time: '2024-02-14T07:42:09.073Z',
  },
  {
    idx: 113,
    pre: '  ',
    next: 'sasaddasads',
    time: '2024-02-14T07:42:09.423Z',
  },
  {
    idx: 111,
    pre: '  ',
    next: '',
    time: '2024-02-14T07:42:09.704Z',
  },
  {
    idx: 111,
    pre: '\n',
    next: '',
    time: '2024-02-14T07:42:09.974Z',
  },
  {
    idx: 117,
    pre: '',
    next: '  \n',
    time: '2024-02-14T07:43:59.036Z',
  },
  {
    idx: 119,
    pre: '',
    next: 'w',
    time: '2024-02-14T07:43:59.665Z',
  },
  {
    idx: 120,
    pre: '',
    next: 'e',
    time: '2024-02-14T07:43:59.810Z',
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
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender1',
    message: '',
    date: '2024-02-12T03:18:20.7195703',
  },
  {
    type: 'TALK',
    roomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sender: 'sender2',
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
          let date = new Date();
          if (historyDto.length === 0) {
            date = new Date(historyDto[0].time);
            date.setSeconds(date.getSeconds() - 1);
            historyDto.unshift({
              idx: 120,
              pre: '',
              next: 'public class Main\n{ public static void main(String[] args) {\nSystem.out.println("Hello, world!");\n}\n} ',
              time: date.toISOString(),
            });
          }

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
  // const totalPage = historyPage + messagePage;
  const handleMessageSelect = (index: number) => {
    // console.log(index, messageHistory[index].date);
    const tarDate = new Date(messageHistory[index].date);
    let i = 1;
    while (
      i < historyHistory.length &&
      new Date(historyHistory[i].time) < tarDate
    ) {
      i += 1;
    }

    setCurrentPage(i);
  };

  // const totalPage = 5;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 코드는 누적 합
  const History: string[] = [];
  // 채팅은 그때그때 [][0] = sender, [][1] 메세지
  const Message: string[][] = [];

  // 값 넣기(값 넣기는 한 번만 하고 싶은데, 재렌더링 계속 말고)

  History[0] = historyHistory[0].next;
  for (
    let i = 1;
    i < (currentPage < historyPage ? currentPage + 1 : historyPage);
    i += 1
  ) {
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
  const messageProps: string[][] = Message;
  // currentPage = 순서 배열의 인덱스(채팅배열, 코드배열 인덱스 가지고 있음)-2차원 배열
  // 그에 맞게 출력

  // 현재페이지에 맞는 데이터값 파악(ex- 메세지 몇 번째, 히스토리 몇 번째)
  //    양 데이터 초기값 시간 비교

  return (
    <div>
      <NavBar sort="질문히스토리 보기" pushPage="question-list" />
      <div className={styles.questionContainer}></div>
      <div className={styles.allContainer}>
        <div className={styles.historyContainer}>
          <div className={styles.codeEditor}>
            <QuestionCodeEditor initialData={History[currentPage - 1]} />
          </div>
          <div>
            <QuestionChatting
              messageProps={messageProps}
              messageSender={messageSender}
              messageSelect={handleMessageSelect}
            />
          </div>
        </div>
        <div className={styles.pageContainer}>
          <MoveButton
            totalPage={historyPage}
            limit={1}
            page={currentPage}
            setPage={handlePageChange}
          />

          <SlideBar
            totalPage={historyPage}
            page={currentPage}
            setPage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
