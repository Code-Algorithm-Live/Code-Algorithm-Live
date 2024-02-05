import '@/styles/reset.css';
import Nav from '@/components/Common/Header';
import HistorySideBar from '@/components/Home/HistorySideBar';

export default function Home() {
  return (
    <>
      <Nav />
      <HistorySideBar />
    </>
  );
}
