import BasicModal from '@/components/Common/Modal';
import QuestionContent, {
  QuestionContentProps,
} from '@/components/Chat/QuestionModal/QuestionContent';

const QuestionModal = ({
  isOpen,
  onClose,
  modalData,
}: {
  isOpen: boolean;
  onClose: () => void;
} & QuestionContentProps) => {
  console.log('isOpen', isOpen);
  console.log('modalData', modalData);
  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <>
        <QuestionContent modalData={modalData} />;
      </>
    </BasicModal>
  );
};

export default QuestionModal;
