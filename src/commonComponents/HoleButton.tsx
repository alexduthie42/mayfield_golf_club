import { Button } from "@chakra-ui/react";
import UseWindowSize from './UseWindowSize';
import { TabletWidth } from './Globals';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import hole1 from './../content/holeImages/hole1.jpg';
import hole2 from './../content/holeImages/hole2.jpg';
import hole3 from './../content/holeImages/hole3.jpg';
import hole4 from './../content/holeImages/hole4.jpg';
import hole5 from './../content/holeImages/hole5.jpg';
import hole6 from './../content/holeImages/hole6.jpg';
import hole7 from './../content/holeImages/hole7.jpg';
import hole8 from './../content/holeImages/hole8.jpg';
import hole9 from './../content/holeImages/hole9.jpg';


const HoleButton = ({
  top = "30%",
  left = "50%",
  transform = "translate(-50%, -50%)",
  label = "Click Me",
}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = UseWindowSize();
  const holeImage: Record<string, string> = {"1": hole1, "2": hole2, "3": hole3, "4": hole4, "5": hole5, "6": hole6, "7": hole7, "8": hole8, "9": hole9 }

  return (
    <div>
      <Button
        colorScheme="coreTheme"
        rounded="full"
        size={width <= TabletWidth ? "xs" : "sm"}
        sx={{
          position: "absolute",
          top,
          left,
          transform,
        }}
        onClick={onOpen}
      >
        {label}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent minW={width * 0.4}>
          <ModalHeader>Hole {label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={holeImage[label]}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

  );
};

export default HoleButton;