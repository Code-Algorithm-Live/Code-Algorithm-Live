import styled from 'styled-components';
import Link from 'next/link';

interface ListItem {
  main: string;
  sub: string;
  href: string;
}

interface ListProps {
  historyList: ListItem[];
}

const Container = styled.div`
  height: calc(100vh - 200px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--editorTypo-color);
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const SidebarLink = styled.div`
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--editorTypo-color);
  }
`;

const MainText = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  color: var(--main-font-color);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubText = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 300;
  line-height: normal;
  color: var(--main-font-color);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const List: React.FC<ListProps> = ({ historyList }) => {
  return (
    <Container>
      {historyList.map((history, index) => (
        <Link key={index} href={history.href}>
          <SidebarLink>
            <MainText>{history.main}</MainText>
            <SubText>{history.sub}</SubText>
          </SidebarLink>
        </Link>
      ))}
    </Container>
  );
};

export default List;
