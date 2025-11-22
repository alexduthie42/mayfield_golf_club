import React from 'react';
import './../../App.css';
import TitleImage from './Content/TitleImage.jpg'
import { 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  Box, 
  AccordionIcon,
  AccordionPanel,
  Heading,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody
} from '@chakra-ui/react'
import { Button, ButtonGroup, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import PageTitle from '../../CommonComponents/PageTitle';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import { ToolbarProps } from 'react-big-calendar';
import moment from 'moment'
import { MobileWidth } from '../../CommonComponents/Globals';
import UseWindowSize from '../../CommonComponents/UseWindowSize';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type MyEvent = {
  title: string;
  start: Date;
  end: Date;
};

const CustomToolbar: React.FC<ToolbarProps<MyEvent, object>> = ({
  label,
  onNavigate,
  onView,
  view,
}) => {
  return (
     <Box mb={4}>
      <Grid templateRows="auto auto auto" gap={4} placeItems="center" justifyContent="center">
        <GridItem className='calendarNavGridItem'>
          <ButtonGroup variant="solid" colorScheme="blue" w="100%">
            <Button w="33.33%" onClick={() => onNavigate('PREV')}>
              Prev
            </Button>
            <Button w="33.33%" onClick={() => onNavigate('TODAY')}>
              Today
            </Button>
            <Button w="33.33%" onClick={() => onNavigate('NEXT')}>
              Next
            </Button>
          </ButtonGroup>
        </GridItem>

        <GridItem className='calendarNavGridItem'>
          <ButtonGroup isAttached variant="outline" colorScheme="blue" w="100%">
            <Button
              w="50%"
              variant={view === 'month' ? 'solid' : 'outline'}
              onClick={() => onView('month')}
            >
              Month
            </Button>
            <Button
              w="50%"
              variant={view === 'week' ? 'solid' : 'outline'}
              onClick={() => onView('week')}
            >
              Week
            </Button>
          </ButtonGroup>
        </GridItem>

        {/* Row 3: Label */}
        <GridItem>
          <Text fontSize="xl" fontWeight="semibold">
            {label}
          </Text>
        </GridItem>
      </Grid>
    </Box>

  );
};


export default function Schedule() {

  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;

  const localizer = momentLocalizer(moment) // or globalizeLocalizer


  const generateWeeklyEvents = (
    title: string,
    startDate: Date,
    endDate: Date,
    repeatCount: number
  ) => {
    const events = [];
    for (let i = 0; i < repeatCount; i++) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setDate(start.getDate() + i * 7);
      end.setDate(end.getDate() + i * 7);
      events.push({ title, start, end });
    }
    return events;
  };

  const recurringEvents = generateWeeklyEvents(
    'Club Day',
    new Date(2025, 0, 4),
    new Date(2025, 0, 4),
    52
  );


  const events = [
    {
      title: 'Team Meeting',
      start: new Date(2025, 10, 10),
      end: new Date(2025, 10, 10),
    },
    {
      title: 'Lunch Break',
      start: new Date(2025, 10, 10),
      end: new Date(2025, 10, 10),
    },
  ];


  const MyCalendar = () => (
    <div>
      <PageTitle mainText='SCHEDULE' subText='2025 - 2026' image={TitleImage}/>
      <div className={isDesktopView ? "schedulePageContainerDesktop" : "schedulePageContainerMobile"}>
        <Calendar
          localizer={localizer}
          events={recurringEvents}
          components={{toolbar: CustomToolbar}}
          startAccessor="start"
          endAccessor="end"
          style={{ height: isDesktopView ? 800 : 500 }}
          views={['month', 'week']}
          defaultView="month"
        />
      </div>
    </div>);

  return (
    <div>{MyCalendar()}</div>
  );
}
