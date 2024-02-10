import { type Text } from 'yorkie-js-sdk';

type YorkieDoc = {
  content: Text;
};

interface History {
  idx: number; // 변경이 일어날 인덱스위치
  pre: string; // 변경 되기 이전 위치의 텍스트
  next: string; // 변경된 이후 텍스트
  time: number; // 채팅방 생성 후 ~ 변경이 생겼을 때
}

export type { History, YorkieDoc };
