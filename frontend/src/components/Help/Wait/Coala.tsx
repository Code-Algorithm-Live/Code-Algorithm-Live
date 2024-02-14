import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface CoalaImageProps extends ImageProps {
  $imgNumber: number;
}

const slideIn = keyframes`
  from {
    transform: translateX(-400%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(400%);
  }
`;

const CoalaContainer = styled.div`
  width: 80%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

const CoalaImage = styled(Image)<CoalaImageProps>`
  position: absolute;
  width: 200px;
  height: 300px;
  left: calc(50% - 100px);
  animation: ${({ $imgNumber }) => ($imgNumber % 2 === 1 ? slideIn : slideOut)}
    2.1s ease-in-out;
`;

const Coala = () => {
  const [imgNumber, setImgNumber] = useState<number>(1);

  useEffect(() => {
    let currentNumber = 1;
    const interval = setInterval(() => {
      setImgNumber(currentNumber);
      currentNumber = (currentNumber % 4) + 1;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CoalaContainer>
      <CoalaImage
        src={`/images/wait/${imgNumber}.png`}
        alt="imgNumber"
        width={200}
        height={300}
        $imgNumber={imgNumber}
      />
    </CoalaContainer>
  );
};

export default Coala;
