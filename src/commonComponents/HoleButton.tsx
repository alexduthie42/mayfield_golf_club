import { Button } from "@chakra-ui/react";

const HoleButton = ({
  top = "30%",
  left = "50%",
  transform = "translate(-50%, -50%)",
  label = "Click Me",
  onClick = () => {},
}) => {
  return (
    <Button
      colorScheme="blue"
      rounded="full"
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