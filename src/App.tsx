import './App.css';
import Main from './commonComponents/Main';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { headingTheme } from "./themes/Heading";

const theme = extendTheme(
{
  colors : {
    50: "#328ee9",
  },
  components: {
      Heading: headingTheme,
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Main/>
    </ChakraProvider>
  );
}

export default App;
