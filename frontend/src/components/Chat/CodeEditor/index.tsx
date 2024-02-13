'use client';

import { java } from '@codemirror/lang-java';
import { useMutation } from '@tanstack/react-query';
import { atomone } from '@uiw/codemirror-theme-atomone';
import ReactCodeMirror, {
  EditorView,
  ReactCodeMirrorRef,
  Transaction,
  ViewUpdate,
} from '@uiw/react-codemirror';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import yorkie, {
  DocEventType,
  EditOpInfo,
  OperationInfo,
  Text,
} from 'yorkie-js-sdk';

import { fetchCreateCodeHistory } from '@/api/chat';
import { History, YorkieDoc } from '@/components/Chat/CodeEditor/type';
import { addHistory } from '@/components/Chat/CodeEditor/util';
import useHelpFromStore from '@/store/helpForm';

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

const DEFAULT_CODE = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`;
const yorkieBaseURL = process.env.NEXT_PUBLIC_YORKIE_BASE_URL || '';
const YORKIE_API_KEY = process.env.NEXT_PUBLIC_YORKIE_API_KEY || '';
const MAX_HISTORY = 10;

const CodeEditor = ({ onChange }: { onChange: (content: string) => void }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const DOC_NAME = `${roomId}-${new Date()
    .toISOString()
    .substring(0, 10)
    .replace(/-/g, '')}`;
  const ref = useRef<HTMLDivElement>(null);
  const codeMirrorView = useRef<ReactCodeMirrorRef>({});
  const [doc] = useState(() => new yorkie.Document<YorkieDoc>(DOC_NAME));
  const preContent = useRef('');
  const [eleOffset, setEleOffset] = useState({ width: '', height: '' });
  const [history, setHistory] = useState<History[]>([]);
  const createHistoryMutation = useMutation({
    mutationFn: fetchCreateCodeHistory,
  });
  const { helpForm } = useHelpFromStore();
  const isSender = useSession().data?.user.email === helpForm?.sender.email;

  const flushHistory = () => {
    createHistoryMutation.mutate({ roomUuid: roomId, list: history });
    if (createHistoryMutation.isSuccess) {
      console.log('flush');
      setHistory([]);
    }
  };

  const handleAddHistory = ({
    preStr,
    nextStr,
  }: {
    preStr: string;
    nextStr: string;
  }) => {
    // sender인 유저에서 history 기록
    if (!isSender) return;

    if (history.length === MAX_HISTORY) {
      flushHistory();
    }

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

          doc.update(root => {
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

    const attachDoc = async ({
      onRemoteChange,
      onDocChange,
    }: {
      onRemoteChange: ({
        preStr,
        nextStr,
      }: {
        preStr: string;
        nextStr: string;
      }) => void;
      onDocChange: (content: string) => void;
    }) => {
      await client.activate();

      await client.attach(doc);

      doc.update(root => {
        if (!root.content) {
          // eslint-disable-next-line no-param-reassign
          root.content = new Text();
          root.content.edit(0, 0, DEFAULT_CODE);
        }
      }, 'create content if not exists');

      doc.subscribe(event => {
        if (event.type === DocEventType.Snapshot) syncText();
      });

      doc.subscribe('$.content', event => {
        if (event.type === DocEventType.LocalChange) {
          onDocChange(doc.getRoot().content.toString());
        }

        // remote change 이벤트 발생
        if (event.type === DocEventType.RemoteChange) {
          const { operations } = event.value;
          handleOperations(operations);
          const nextStr = doc.getRoot().content.toString();
          onRemoteChange({ preStr: preContent.current, nextStr });
          onDocChange(doc.getRoot().content.toString());
        }
      });

      await client.sync();
      syncText();

      onDocChange(doc.getRoot().content.toString());
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    attachDoc({
      onRemoteChange: ({
        preStr,
        nextStr,
      }: {
        preStr: string;
        nextStr: string;
      }) => handleAddHistory({ preStr, nextStr }),
      onDocChange: (content: string) => {
        onChange(content);
      },
    });
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
