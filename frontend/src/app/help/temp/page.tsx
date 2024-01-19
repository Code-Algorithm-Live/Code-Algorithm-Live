'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import UrlInput from '@/app/help/temp/UrlInput';

const LinkPreivew = ({
  isLoading,
  metaData,
}: {
  isLoading: boolean;
  metaData: any;
}) => {
  return (
    <div style={{ marginBottom: '29px' }}>
      <div>
        미리보기
        {isLoading && <p>로딩중입니다.</p>}
      </div>
      {!isLoading && <div>링크</div>}
    </div>
  );
};

const Create = () => {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isValid, setIsValid] = useState(false); // 폼 유효성 검증
  const [isUrlFetchLoading, setIsUrlFetchLoading] = useState(false);

  const createLink = useMutation({
    mutationFn: () => {
      return new Promise(resolve => resolve('임시 Promise'));
    },
  }); // POST 요청
  const handleCreate = () => {
    if (createLink.isPending) return;

    if (!isValid) return;

    /** 
    createLink.mutate(
      {},
      {
        onSuccess: () => {
          router.push('/');
        },
      }
    );
    */
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e?.target?.value)}
      />

      <LinkPreivew isLoading={isUrlFetchLoading} metaData={{}} />

      <UrlInput
        value={url}
        onUrlFetchSuccess={data => {
          setTitle('title');
        }}
        onInputChange={e => {
          if (e) setUrl(e.target.value);
          else setUrl('');
        }}
        watchLoadingState={loadingState => setIsUrlFetchLoading(loadingState)}
      />

      <ButtonBlock>
        <Button type="submit" disabled={!isValid}>
          완료
        </Button>
      </ButtonBlock>
    </Form>
  );
};

export default Create;

const Form = styled.form`
  padding: 16px 16px 0;
`;

const ButtonBlock = styled.div``;

const Button = styled.button``;
