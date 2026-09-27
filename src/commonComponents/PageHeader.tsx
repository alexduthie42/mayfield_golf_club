import React from 'react';
import './../App.css';
import NavBar from './NavBar';
import NavDrawer from './NavDrawer';
import logo from './../Content/MayfieldGolfClubLogo.png';
import logoWhite from './../Content/MayfieldGolfClubLogoWhite.png';
import { Center, Grid, GridItem } from '@chakra-ui/react';
import { MobileWidth } from './Globals';
import UseWindowSize from './UseWindowSize';
import { AppSettingsApi } from '../api/apis/AppSettingsApi';

const appSettingsApi = new AppSettingsApi();

interface PageHeaderProps {
  page: string;
  setPage: (page: string) => void;
}

export default function PageHeader(pageHeaderProps: PageHeaderProps) {

  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;
  const [courseOpen, setCourseOpen] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let isActive = true;

    const loadCourseOpenSetting = async () => {
      try {
        const settings = await appSettingsApi.getAppSettings({ names: ['CourseOpen'] });
        const setting = settings.find((item) => item.name === 'CourseOpen');
        const normalizedValue = setting?.value.trim().toLowerCase();

        if (normalizedValue !== 'true' && normalizedValue !== 'false') {
          throw new Error('The CourseOpen setting must have a true or false value.');
        }

        if (isActive) {
          setCourseOpen(normalizedValue === 'true');
        }
      } catch (error) {
        console.error('Failed to load CourseOpen app setting', error);
      }
    };

    void loadCourseOpenSetting();
    return () => {
      isActive = false;
    };
  }, []);

  const courseStatus = courseOpen === null
    ? null
    : `Course Status: ${courseOpen ? 'Open' : 'Closed'}`;
  const courseStatusClass = courseOpen ? 'courseStatusOpen' : 'courseStatusClosed';

  if (isDesktopView)
  {
    return (
        <Grid templateColumns='repeat(12, 1fr)' gap={0} className='headerbar'>
            <GridItem colSpan={3}>
                <img src={logo} className='logo'/>
            </GridItem>
            <GridItem colSpan={6}>
                <NavBar page={pageHeaderProps.page} setPage={pageHeaderProps.setPage}/>
            </GridItem>
            <GridItem colSpan={3} display='flex' alignItems='center' justifyContent='center'>
                {courseStatus && (
                  <div className={`courseStatus courseStatusDesktop ${courseStatusClass}`}>
                    {courseStatus}
                  </div>
                )}
            </GridItem>
        </Grid>
    );
  }
  else 
  {
    return (
        <>
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
          {courseStatus && (
            <div className={`courseStatus courseStatusMobile ${courseStatusClass}`}>
              {courseStatus}
            </div>
          )}
        </>
    );
  }
}
