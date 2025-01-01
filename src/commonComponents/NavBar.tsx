import React from 'react';
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

  const [tabIndex, setTabIndex] = React.useState(0)

  const getByValue = (map: Map<number, string>, searchValue: string) => {
    for (let index = 0; index < map.size; index++) {
      const value = map.get(index);
      
      if (value === searchValue)
      {
        return index;
      }
    }
    return 0;
  }

  React.useEffect(() => {
    const startIndex = getByValue(pagesMap, navBarProps.page) ?? 0;
    setTabIndex(startIndex);
 });

  const handleTabsChange = (index: number) => {
    navBarProps.setPage(pagesMap.get(index) ?? "home")
    setTabIndex(index)
  }

  return (
    <div className='navbar'>
      <Tabs index={tabIndex} size='lg' align='center' isFitted onChange={(index) => handleTabsChange(index)}>
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
