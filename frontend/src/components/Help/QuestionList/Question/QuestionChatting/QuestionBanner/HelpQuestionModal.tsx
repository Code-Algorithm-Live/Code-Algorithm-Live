import BasicModal from '@/components/Common/Modal';
import HelpQuestionContent from '@/components/Help/QuestionList/Question/QuestionChatting/QuestionBanner/HelpQuestionContent';

const HelpQuestionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <>
        <HelpQuestionContent />;
      </>
    </BasicModal>
  );
};

export default HelpQuestionModal;
