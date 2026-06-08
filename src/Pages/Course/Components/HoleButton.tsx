import { Button } from "@chakra-ui/react";
import UseWindowSize from '../../../CommonComponents/UseWindowSize';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import hole1 from './../Content/HoleImages/hole1.jpg';
import hole2 from './../Content/HoleImages/hole2.jpg';
import hole3 from './../Content/HoleImages/hole3.jpg';
import hole4 from './../Content/HoleImages/hole4.jpg';
import hole5 from './../Content/HoleImages/hole5.jpg';
import hole6 from './../Content/HoleImages/hole6.jpg';
import hole7 from './../Content/HoleImages/hole7.jpg';
import hole8 from './../Content/HoleImages/hole8.jpg';
import hole9 from './../Content/HoleImages/hole9.jpg';
import { MobileWidth } from "../../../CommonComponents/Globals";


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
        size={width <= MobileWidth ? "xs" : "sm"}
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
            <div style={{ aspectRatio: '16 / 9', width: '100%' }}>
              <img src={holeImage[label]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
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