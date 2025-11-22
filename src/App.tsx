import './App.css';
import Main from './Main';
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./Theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Main/>
    </ChakraProvider>
  );
}

export default App;
