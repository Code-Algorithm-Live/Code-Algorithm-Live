import Image from 'next/image';
import {IconNext} from '@assets/svgs';
import '@/styles/reset.css';

export default function Home() {
  const foo = 3;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <IconNext width={120} height={32} />
    </main>
  );
}
