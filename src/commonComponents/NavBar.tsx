import Home from '../pages/Home';
import './../App.css';
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from '@chakra-ui/react'

interface NavBarProps {
  page: string;
  setPage: (page: string) => void;
}

const pagesMap: Map<number, string> = new Map([
  [0, "home"],
  [1, "contact"],
  [2, "schedule"],
  [3, "play"]
]);

export default function NavBar(navBarProps: NavBarProps) {
  return (
    <div className='navbar'>
      <Tabs size='lg' align='center' isFitted onChange={(index) => navBarProps.setPage(pagesMap.get(index) ?? "home")}>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Contact</Tab>
          <Tab>Schedule</Tab>
          <Tab>Play</Tab>
        </TabList>
      </Tabs>
    </div>
  );
}
