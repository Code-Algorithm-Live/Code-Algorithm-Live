import Image from 'next/image';
import { useEffect, useState } from 'react';

const Coala = () => {
  const [imgNumber, setImgNumber] = useState<number>(1);
  useEffect(() => {
    const interval = setInterval(() => {
      const changeNumber = Math.round(Math.random() * 4) + 1;
      setImgNumber(changeNumber);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '360px' }}>
      <Image
        src={`/images/wait/${imgNumber}.png`}
        alt="imgNumber"
        width={230}
        height={343}
      ></Image>
    </div>
  );
};
export default Coala;
