import './App.css';
import Main from './Main';
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./Theme";
import Admin from './Pages/Admin/Admin';
import { isAdminPath } from './auth/entraAuth';

function App() {
  return (
    <ChakraProvider theme={theme}>
      {isAdminPath(window.location.pathname) ? <Admin /> : <Main />}
    </ChakraProvider>
  );
}

export default App;
