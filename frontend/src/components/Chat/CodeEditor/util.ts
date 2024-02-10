import { History } from '@/components/Chat/CodeEditor/type';

/**
 * @param preStr 변경이 일어나기 전 값
 * @param nextStr 변경이 일어난 후 값
 * @param startTime 채팅방 개설 시간
 * @returns
 */
function addHistory({
  preStr,
  nextStr,
}: {
  preStr: string;
  nextStr: string;
}): History | undefined {
  let preIdx = 0;
  let reverseIdx = 1;
  const shortLen =
    preStr.length < nextStr.length ? preStr.length : nextStr.length;

  while (preIdx < shortLen && preStr[preIdx] === nextStr[preIdx]) {
    preIdx += 1;
  }

  if (preIdx === preStr.length && preIdx === nextStr.length) return;

  while (
    preIdx <= shortLen - reverseIdx &&
    preStr[preStr.length - reverseIdx] === nextStr[nextStr.length - reverseIdx]
  ) {
    reverseIdx += 1;
  }

  const data = {
    idx: preIdx,
    pre: preStr.substring(preIdx, preStr.length - reverseIdx + 1),
    next: nextStr.substring(preIdx, nextStr.length - reverseIdx + 1),
    duration: new Date().getTime(),
  };

  // eslint-disable-next-line consistent-return
  return data;
}

export { addHistory };
