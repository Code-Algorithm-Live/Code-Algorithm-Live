import { styled } from 'styled-components';
import useHelpFromStore from '@/store/helpForm';

const Container = styled.div`
  display: flex;
`;

const BubbleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const Bubble = styled.div`
  display: flex;
  padding: 10px 8px;

  width: fit-content;
  max-width: 230px;

  border-radius: 15px;
  background: var(--main-color, #5471a5);

  color: var(--editorTypo-color, #f5f5f5);
  font-size: 15px;
`;

const FirstBubble = styled(Bubble)`
  border-radius: 15px 15px 15px 0px;
`;

const Time = styled.span`
  color: var(--editorTypo, #e2e1e1);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProfileImageWrapper = styled.div`
  margin-right: 8px;
`;

const Profile = styled.div<{ imageUrl?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
`;

const ProfileSpace = styled.div`
  width: 40px;
  height: 40px;
`;

const ProfileImage = () => {
  const { helpForm } = useHelpFromStore();
  return (
    <ProfileImageWrapper>
      <Profile imageUrl={helpForm?.sender.image} />
    </ProfileImageWrapper>
  );
};

const YourBubble = ({
  first,
  message,
  date,
}: {
  first?: boolean;
  message: string;
  date: string;
}) => {
  const BubbleStyle = first ? FirstBubble : Bubble;

  return (
    <Container>
      {first && <ProfileImage />}
      <BubbleContainer>
        {!first && <ProfileSpace />}
        <BubbleStyle>{message}</BubbleStyle>
        <Time>{date}</Time>
      </BubbleContainer>
    </Container>
  );
};

export default YourBubble;
