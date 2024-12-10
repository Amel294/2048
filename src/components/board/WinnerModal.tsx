import React from "react";
import useGameStore from "../../store/useGameStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const WinnerModal: React.FC = () => {
  const { winner, regenerateBoard } = useGameStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleRestart = () => {
    regenerateBoard();
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (winner) {
      setIsModalOpen(true);
    }
  }, [winner]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleClose} backdrop="blur">
        <ModalContent>
          <ModalHeader>
            <h2 className="text-3xl font-bold">You Win!</h2>
          </ModalHeader>
          <ModalBody>
            <div className="text-lg">
              <p>Congratulations on reaching the goal!</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleRestart}>
              Restart
            </Button>
            <Button color="success" onPress={handleClose}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WinnerModal;
