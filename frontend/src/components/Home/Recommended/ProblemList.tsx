import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Problem {
  summary: string;
  number: number;
  title: string;
  href: string;
}

interface ProblemsProps {
  problems: Problem[];
}

const StyledSlide = styled(Slider)<Settings>`
  .slick-list {
    width: 1150px;
    padding: 10px 0px 10px 5px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 20px;
    opacity: 0.75;
    color: var(--main-color);
  }
`;

const ProblemBox = styled.div`
  width: 220px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--editorTypo-color);
  }
`;

const MainText = styled.p`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 800;
  color: var(--main-font-color);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-align: right;
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

const ProblemList: React.FC<ProblemsProps> = ({ problems }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <StyledSlide {...settings}>
      {problems.map((problem, index) => (
        <a key={index} href={problem.href}>
          <ProblemBox>
            <MainText>{problem.summary}</MainText>
            <TextContainer>
              <SubText>{problem.number}</SubText>
              <SubText>{problem.title}</SubText>
            </TextContainer>
          </ProblemBox>
        </a>
      ))}
    </StyledSlide>
  );
};

export default ProblemList;
