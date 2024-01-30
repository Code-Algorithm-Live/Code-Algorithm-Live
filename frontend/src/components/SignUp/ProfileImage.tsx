import { styled } from 'styled-components';
import IconEdit from '@assets/svgs/edit.svg';
import React, { useState } from 'react';

interface ProfileImageProps {
  userImage: string;
}

const ImageCircle = styled.div<{ userImage: string }>`
  position: absolute;
  background-image: url(${({ userImage }) => userImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const EditIcon = styled(IconEdit)`
  path {
    stroke: var(--white-color);
  }
  width: 23px;
`;
const EditCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  left: 80px;
  top: 230px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--editorSub-color);
  border: 2px solid var(--white-color);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 300px;
`;

const ProfileImage: React.FC<ProfileImageProps> = ({ userImage }) => {
  const [imgUrl, setImgUrl] = useState<string>('');
  const inputRef = React.createRef<HTMLInputElement>();
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      URL.revokeObjectURL(imgUrl);
      setImgUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Container>
        <ImageCircle
          userImage={imgUrl || userImage}
          onClick={handleImageClick}
        />
        <EditCircle>
          <EditIcon />
        </EditCircle>
      </Container>
      <div>
        <form>
          <input
            ref={inputRef}
            style={{ display: 'none' }}
            type="file"
            onChange={handleFileChange}
          ></input>
        </form>
      </div>
    </>
  );
};

export default ProfileImage;
