import { Button } from "@chakra-ui/react";
import UseWindowSize from './UseWindowSize';
import { TabletWidth } from './Globals';

const HoleButton = ({
  top = "30%",
  left = "50%",
  transform = "translate(-50%, -50%)",
  label = "Click Me",
  onClick = () => {},
}) => {
  
  const { width } = UseWindowSize();

  return (
    <Button
      colorScheme="blue"
      rounded="full"
      size={width <= TabletWidth ? "xs" : "sm"}
      sx={{
        position: "absolute",
        top,
        left,
        transform,
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default HoleButton;