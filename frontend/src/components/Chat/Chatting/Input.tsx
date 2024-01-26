import { styled } from 'styled-components';

const InputForm = styled.form`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 12px 22px 14px;
  height: 80px;

  box-sizing: border-box;

  color: #9ca6ae;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: var(--editorSub, #343746);

  input {
    width: 90%;
    height: 100%;
    padding: 0 10px;
    background: var(--editorSub, #343746);
  }

  button {
    width: 10%;
    height: 100%;
  }
`;

const Input = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <>
      <InputForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="chat"
          id="chat"
          placeholder="메세지를 입력하세요..."
          autoComplete="false"
        />
        <button type="submit">전송</button>
      </InputForm>
    </>
  );
};

export default Input;
