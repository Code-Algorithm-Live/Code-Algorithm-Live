'use client';

import { java } from '@codemirror/lang-java';
import { atomone } from '@uiw/codemirror-theme-atomone';
import ReactCodeMirror, {
  EditorView,
  Transaction,
  ViewUpdate,
} from '@uiw/react-codemirror';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import yorkie, { DocEventType, OperationInfo } from 'yorkie-js-sdk';
import { YorkieDoc } from './type';

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

const yorkieBaseURL = 'https://api.yorkie.dev'; // 'http://localhost:3000';
const YORKIE_API_KEY = 'cmtk19dafcg8gj9haj0g';
const DOC_NAME = `hamster-${new Date()
  .toISOString()
  .substring(0, 10)
  .replace(/-/g, '')}`;

const CodeEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('');
  const doc = useRef(new yorkie.Document<YorkieDoc>(DOC_NAME));
  const [content, setContent] = useState<
    {
      from: number;
      to: number;
      insert: any;
    }[]
  >();
  const client = useRef(
    new yorkie.Client(yorkieBaseURL, {
      apiKey: YORKIE_API_KEY,
    }),
  );

  function handleEditOp(op: unknown) {
    const changes = [
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        from: Math.max(0, op.from),
        to: Math.max(0, op.to),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        insert: op.value!.content,
      },
    ];

    setContent(changes);
  }

  function handleOperations(operations: Array<OperationInfo>) {
    operations.forEach(op => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (op.type === 'edit') {
        handleEditOp(op);
      }
    });
  }

  const handleChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
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
        let adj = 0;
        tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
          const insertText = inserted.toJSON().join('\n');
          doc.current.update(root => {
            root.content.edit(fromA + adj, toA + adj, insertText);
          }, `update content byA ${client.current.getID()}`);
          adj += insertText.length - (toA - fromA);
        });
      }
    }
  }, []);

  // 코드 에디터의 최대 높이를 렌더링된 사이즈만큼 지정합니다.
  useEffect(() => {
    if (!ref.current) return;
    setMaxHeight(`${ref.current.offsetHeight - 10}px`);
  }, []);

  useEffect(() => {
    // 02-1. create a document then attach it into the client.
    const attachDoc = async () => {
      await client.current.activate();

      await client.current.attach(doc.current);

      doc.current.update(root => {
        if (!root.content) {
          // eslint-disable-next-line no-param-reassign
          root.content = new yorkie.Text();
        }
      }, 'create content if not exists');

      doc.current.subscribe(event => {
        const text = doc.current.getRoot().content;
        console.log('#####', event, doc.current.getRoot());
        console.log('text', text.toString());
        // /setContent((text.toString());
      });

      doc.current.subscribe('$.content', event => {
        if (event.type === DocEventType.RemoteChange) {
          const { operations } = event.value;
          handleOperations(operations);
        }
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    attachDoc();
  });

  return (
    <Container ref={ref}>
      <ReactCodeMirror
        theme={atomone}
        maxHeight={maxHeight}
        extensions={[java(), editorTheme]}
        onChange={handleChange}
        value={content}
      />
    </Container>
  );
};

export default CodeEditor;
