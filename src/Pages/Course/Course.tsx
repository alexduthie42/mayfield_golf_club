import React from 'react';
import './../../App.css';
import TitleImage from './Content/TitleImage.jpg'
import {  GridItem, Grid, Text } from '@chakra-ui/react';
import UseWindowSize from '../../CommonComponents/UseWindowSize';
import { MobileWidth } from '../../CommonComponents/Globals';
import CourseTableWide from './Components/CourseTableWide';
import CourseTableLong from './Components/CourseTableLong';
import PageTitle from '../../CommonComponents/PageTitle';
import CourseMap from './Components/CourseMap';

export default function Course() {

  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;

  const mainText = 'COURSE';
  const subText = '9 HOLES - PAR 36';

  if (isDesktopView)
  {
    return (
      <div> 
        <PageTitle mainText={mainText} subText={subText} image={TitleImage}/>
        <div className='coursePageContainerDesktop'>
          <div className='courseTextContainerDesktop'>
            <div className='courseTextHeaderDesktop'>
              <Text className='textLargeBold'>COURSE MAP</Text>
            </div>
            <div className='courseTextDesktop'>
              <Text className='textLarge'>Mayfield Golf Course offers a 9 hole course with alternating tees for a full 18 holes. The course features a range of par 3, 4, and 5 holes with some holes including bunkers and water traps, giving a variety of play across the course.</Text>
            </div>
          </div>
          <Grid templateColumns={`repeat(2, 1fr)`} gap={0} rounded="xl" overflow="hidden">
            <GridItem colSpan={1} className='courseMapContainerDesktop'>
              <CourseMap/>
            </GridItem>
            <GridItem colSpan={1}>
                <CourseTableWide/>
            </GridItem>
          </Grid>
        </div>
      </div>
    );
  }
  else 
  {
    return (
      <div> 
        <PageTitle  mainText={mainText} subText={subText} image={TitleImage}/>
        <div className='coursePageContainerMobile'>
          <div className='courseMapTextContainerMobile'>
            <div className='courseTextHeaderMobile'>
              <Text className='textLargeBold'>COURSE MAP</Text>
            </div>
            <div className='courseTextMobile'>
              <Text className='textLarge'>Mayfield Golf Course offers a 9 hole course with alternating tees for a full 18 holes. The course features a range of par 3, 4, and 5 holes with some holes including bunkers and water traps giving a variety of play across the course.</Text>
            </div>
          </div>
          <CourseMap/>
          <CourseTableLong/>
        </div>
      </div>
    );
  }

}
