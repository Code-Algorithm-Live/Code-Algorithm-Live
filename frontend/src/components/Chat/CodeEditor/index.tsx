'use client';

import { java } from '@codemirror/lang-java';
import { atomone } from '@uiw/codemirror-theme-atomone';
import ReactCodeMirror, {
  EditorView,
  ReactCodeMirrorRef,
  Transaction,
  ViewUpdate,
} from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import yorkie, { DocEventType, EditOpInfo, OperationInfo } from 'yorkie-js-sdk';

import { YorkieDoc } from '@/components/Chat/CodeEditor/type';

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const editorTheme = EditorView.theme({
  /* 스크롤 스타일 */
  '.cm-scroller::-webkit-scrollbar': {
    width: '8px',
  },
  '.cm-scroller::-webkit-scrollbar-thumb': {
    background: 'var(--editorSub, #343746)',
  },
  '.cm-scroller::-webkit-scrollbar-track': {
    background: 'var(--editorBlack, #282a36)',
  },
});

const yorkieBaseURL = process.env.NEXT_PUBLIC_YORKIE_BASE_URL || '';
const YORKIE_API_KEY = process.env.NEXT_PUBLIC_YORKIE_API_KEY || '';
const DOC_NAME = `hamster-${new Date()
  .toISOString()
  .substring(0, 10)
  .replace(/-/g, '')}`;

interface History {
  idx: number; // 변경이 일어날 인덱스위치
  pre: string; // 변경 되기 이전 위치의 텍스트
  next: string; // 변경된 이후 텍스트
  duration: number; // 채팅방 생성 후 ~ 변경이 생겼을 때
}

/**
 * history 적정량 쌓은 후 flush
 */

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

/** TODO:
 * sender 호출
 * sender onChange || remote 변화가 일어날 때
 */

const CodeEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const codeMirrorView = useRef<ReactCodeMirrorRef>({});

  const [doc] = useState(() => new yorkie.Document<YorkieDoc>(DOC_NAME));
  const preContent = useRef('');
  const [eleOffset, setEleOffset] = useState({ width: '', height: '' });
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    console.log(history);
  }, [history]);

  const handleAddHistory = ({
    preStr,
    nextStr,
  }: {
    preStr: string;
    nextStr: string;
  }) => {
    const newHistory = addHistory({ preStr, nextStr });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (!newHistory) return;
    setHistory(pre => [...pre, newHistory]);
    preContent.current = nextStr;
  };

  const handleEditOp = (op: EditOpInfo) => {
    const changes = [
      {
        from: Math.max(0, op.from),
        to: Math.max(0, op.to),
        insert: op.value.content,
      },
    ];

    codeMirrorView.current.view?.dispatch({
      changes,
      annotations: [Transaction.remote.of(true)],
    });
  };

  const handleOperations = (operations: OperationInfo[]) => {
    operations.forEach(op => {
      if (op.type === 'edit') {
        handleEditOp(op);
      }
    });
  };

  // local change를 브로드캐스트
  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    if (viewUpdate.docChanged) {
      // eslint-disable-next-line no-restricted-syntax
      for (const tr of viewUpdate.transactions) {
        const events = ['select', 'input', 'delete', 'move', 'undo', 'redo'];
        if (!events.map(event => tr.isUserEvent(event)).some(Boolean)) {
          continue;
        }
        if (tr.annotation(Transaction.remote)) {
          continue;
        }

        let preStr = '';
        let nextStr = '';

        preStr = doc.getRoot().content.toString();

        let adj = 0;
        // eslint-disable-next-line @typescript-eslint/no-shadow,
        tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
          const insertText = inserted.toJSON().join('\n');
          console.log('insertText', insertText);

          doc.update(root => {
            console.log('root.content', root.content);
            root.content.edit(fromA + adj, toA + adj, insertText);
          }, `update content byA `);

          adj += insertText.length - (toA - fromA);

          nextStr = doc.getRoot().content.toString();
          handleAddHistory({ preStr, nextStr });
        });
      }
    }
  };

  // create a document then attach it into the client.
  useEffect(() => {
    const client = new yorkie.Client(yorkieBaseURL, {
      apiKey: YORKIE_API_KEY,
    });

    const syncText = () => {
      const text = doc.getRoot().content;
      codeMirrorView.current.view?.dispatch({
        changes: {
          from: 0,
          to: codeMirrorView.current.view?.state.doc.length,
          insert: text.toString(),
        },
        annotations: [Transaction.remote.of(true)],
      });
    };

    const attachDoc = async () => {
      await client.activate();

      await client.attach(doc);

      doc.update(root => {
        if (!root.content) {
          // eslint-disable-next-line no-param-reassign
          root.content = new yorkie.Text();
        }
      }, 'create content if not exists');

      doc.subscribe(event => {
        if (event.type === DocEventType.Snapshot) syncText();
      });

      // remote change 이벤트 발생
      doc.subscribe('$.content', event => {
        if (event.type === DocEventType.RemoteChange) {
          const { operations } = event.value;
          handleOperations(operations);
          // FIXME: remote change발생시 history 추가
          const nextStr = doc.getRoot().content.toString();
          handleAddHistory({ preStr: preContent.current, nextStr });
        }
      });

      await client.sync();
      syncText();
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    attachDoc();
  }, []);

  // 코드 에디터의 최대 높이를 렌더링된 사이즈만큼 지정합니다.
  useEffect(() => {
    if (!ref.current) return;
    setEleOffset({
      height: `${ref.current.offsetHeight - 10}px`,
      width: `${ref.current.offsetWidth}px`,
    });
  }, []);

  const { width: maxWidth, height: maxHeight } = eleOffset;

  return (
    <Container ref={ref}>
      <ReactCodeMirror
        theme={atomone}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        extensions={[java(), editorTheme]}
        onChange={handleChange}
        ref={codeMirrorView}
      />
    </Container>
  );
};

export default CodeEditor;
