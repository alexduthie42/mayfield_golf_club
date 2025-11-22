import React from 'react';
import Home from '../Pages/Home/Home';
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
  [0, "home"]
  ,[1, "course"]
  ,[2, "schedule"]
  // ,[3, "contact"]
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
      <Tabs colorScheme='coreTheme' index={tabIndex} size='lg' align='center' isFitted onChange={(index) => handleTabsChange(index)}>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Course</Tab>
          <Tab>Schedule</Tab>
          {/* <Tab>Contact</Tab>           */}
        </TabList>
      </Tabs>
    </div>
  );
}
