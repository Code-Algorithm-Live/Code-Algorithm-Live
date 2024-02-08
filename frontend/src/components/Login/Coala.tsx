import Image from 'next/image';

export default function CoalaImg() {
  return (
    <Image
      src="/images/coala/smile.png"
      width={200}
      height={200}
      alt="coala smile image"
      priority
      style={{ width: '250px', height: 'auto', padding: '130px 0px 30px 0px' }}
    />
  );
}
