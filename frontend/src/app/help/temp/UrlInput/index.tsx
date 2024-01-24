import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';

const UrlInput = ({
  value,
  onInputChange,
  onUrlFetchSuccess,
  watchLoadingState,
}: {
  value: string;
  onInputChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlFetchSuccess: (data: unknown) => void;
  watchLoadingState?: (isLoading: boolean) => void;
}) => {
  const [url, setUrl] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');
  const debouncedUrl = useDebounce(url, 2000);

  const { mutate: fetchMetaData, isPending } = useMutation({
    mutationFn: () => {
      return new Promise(resolve => resolve('임시 Promise'));
    },
    onSuccess: data_ => {
      onUrlFetchSuccess(data_);
      setErrorMessage('');
    },
    onError: () => {
      setErrorMessage('에러');
    },
  });

  useEffect(() => {
    if (watchLoadingState) watchLoadingState(isPending);
  }, [isPending]);

  const handleFetchURL = () => {};

  useEffect(() => {
    if (debouncedUrl) {
      handleFetchURL();
    }
  }, [debouncedUrl]);

  return (
    <div style={{ marginBottom: '14px' }}>
      <input
        type="text"
        id="url"
        placeholder="URL을 입력하거나 복사한 URL을 입력해주세요."
        value={url}
        onChange={e => {
          setUrl(e.target.value);
          onInputChange(e);
        }}
      />
    </div>
  );
};

export default UrlInput;
