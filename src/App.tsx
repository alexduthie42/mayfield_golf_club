import './App.css';
import Main from './commonComponents/Main';
import { ChakraProvider, extendTheme, theme as base } from '@chakra-ui/react'
import { fontTheme } from "./themes/fontTheme";

const theme = extendTheme(
{
  colors : {
    50: "#328ee9",
  },
  components: {
      Heading: fontTheme,
      Text: fontTheme,
      Link: fontTheme
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
