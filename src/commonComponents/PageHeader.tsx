import React from 'react';
import './../App.css';
import NavBar from './NavBar';
import NavDrawer from './NavDrawer';
import logo from './../content/MayfieldGolfClubLogo.png';
import logoWhite from './../content/MayfieldGolfClubLogoWhite.png';
import { Center, Grid, GridItem } from '@chakra-ui/react';

interface PageHeaderProps {
  page: string;
  setPage: (page: string) => void;
}

export default function PageHeader(pageHeaderProps: PageHeaderProps) {

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  if (dimensions.width > 1300)
  {
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={6} className='headerbar'>
            <GridItem colSpan={1}>
                <img src={logo} className='logo'/>
            </GridItem>
            <GridItem colSpan={4}>
                <NavBar page={pageHeaderProps.page} setPage={pageHeaderProps.setPage}/>
            </GridItem>
        </Grid>
    );
  }
  else 
  {
    return (

        <Grid templateColumns='repeat(4, 1fr)' className='headerdrawer'>
            <GridItem colSpan={1} className='drawerbutton'>
                <NavDrawer page={pageHeaderProps.page} setPage={pageHeaderProps.setPage}/>
            </GridItem>
            <GridItem colSpan={2}>
                <Center>
                    <img src={logoWhite} className='logo'/>
                </Center>
            </GridItem>
        </Grid>
    );
  }
}
