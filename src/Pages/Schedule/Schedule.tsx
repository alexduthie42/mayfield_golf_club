import React from 'react';
import './../../App.css';
import TitleImage from './Content/TitleImage.jpg'
import { Box } from '@chakra-ui/react'
import { Button, ButtonGroup, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import PageTitle from '../../CommonComponents/PageTitle';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { ToolbarProps, EventPropGetter } from 'react-big-calendar';
import moment from 'moment'
import { MobileWidth } from '../../CommonComponents/Globals';
import UseWindowSize from '../../CommonComponents/UseWindowSize';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MensEventsRaw from './Content/MensEvents.json';
import WomensEventsRaw from './Content/WomensEvents.json';
import MensAorangiEventsRaw from './Content/MensAorangiEvents.json';
import WomensAorangiEventsRaw from './Content/WomensAorangiEvents.json';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react';

type MyEvent = {
  title: string;
  start: Date;
  end: Date;
  gender: 'mens' | 'womens' | 'mensAorangi' | 'womensAorangi';
};

type CalendarMode = 'club' | 'aorangi';

const mensEvents: MyEvent[] = MensEventsRaw.map(e => ({
  ...e,
  start: new Date(e.start),
  end: new Date(e.end),
  gender: 'mens',
}));

const womensEvents: MyEvent[] = WomensEventsRaw.map(e => ({
  ...e,
  start: new Date(e.start),
  end: new Date(e.end),
  gender: 'womens',
}));

const mensAorangiEvents: MyEvent[] = MensAorangiEventsRaw.map(e => ({
  ...e,
  start: new Date(e.start),
  end: new Date(e.end),
  gender: 'mensAorangi',
}));

const womensAorangiEvents: MyEvent[] = WomensAorangiEventsRaw.map(e => ({
  ...e,
  start: new Date(e.start),
  end: new Date(e.end),
  gender: 'womensAorangi',
}));

const clubEvents: MyEvent[] = [...mensEvents, ...womensEvents];
const aorangiEvents: MyEvent[] = [...mensAorangiEvents, ...womensAorangiEvents];

const eventStyleGetter: EventPropGetter<MyEvent> = (event) => ({
  style: {
    backgroundColor:
      event.gender === 'mens' ? '#267703' :
      event.gender === 'womens' ? '#2b6cb0' :
      event.gender === 'mensAorangi' ? '#267703' :
      '#2b6cb0',
    color: 'white',
    borderRadius: '4px',
  },
});

type CustomToolbarProps = ToolbarProps<MyEvent, object> & {
  calendarMode: CalendarMode;
  onCalendarModeChange: (mode: CalendarMode) => void;
};

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  label, onNavigate, onView, view, calendarMode, onCalendarModeChange,
}) => {
  return (
    <Box mb={4}>
      <Grid templateRows="auto auto auto auto auto" gap={4} placeItems="center" justifyContent="center">

        {/* Club / Aorangi toggle */}
        <GridItem className='calendarNavGridItem'>
          <ButtonGroup isAttached variant="outline" colorScheme="blue" w="100%">
            <Button
              w="50%"
              variant={calendarMode === 'club' ? 'solid' : 'outline'}
              onClick={() => onCalendarModeChange('club')}
            >
              Club
            </Button>
            <Button
              w="50%"
              variant={calendarMode === 'aorangi' ? 'solid' : 'outline'}
              onClick={() => onCalendarModeChange('aorangi')}
            >
              Aorangi
            </Button>
          </ButtonGroup>
        </GridItem>

        {/* Prev / Today / Next */}
        <GridItem className='calendarNavGridItem'>
          <ButtonGroup variant="solid" colorScheme="blue" w="100%">
            <Button w="33.33%" onClick={() => onNavigate('PREV')}>Prev</Button>
            <Button w="33.33%" onClick={() => onNavigate('TODAY')}>Today</Button>
            <Button w="33.33%" onClick={() => onNavigate('NEXT')}>Next</Button>
          </ButtonGroup>
        </GridItem>

        {/* Month / Week toggle */}
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
              variant={view === 'agenda' ? 'solid' : 'outline'}
              onClick={() => onView('agenda')}
            >
              Week
            </Button>
          </ButtonGroup>
        </GridItem>

        <GridItem>
          <Text fontSize="xl" fontWeight="semibold">{label}</Text>
        </GridItem>

        {/* Legend */}
        <GridItem>
            <Flex gap={6}>
              <Flex align="center" gap={2}>
                <Box w={3} h={3} borderRadius="sm" bg="#267703" />
                <Text fontSize="sm">Men's Events</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Box w={3} h={3} borderRadius="sm" bg="#2b6cb0" />
                <Text fontSize="sm">Women's Events</Text>
              </Flex>
            </Flex>
        </GridItem>

      </Grid>
    </Box>
  );
};


export default function Schedule() {
  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;

  moment.locale('en', { week: { dow: 1 } });
  const localizer = momentLocalizer(moment);

  const [calendarMode, setCalendarMode] = React.useState<CalendarMode>('club');

  const activeEvents = calendarMode === 'club' ? clubEvents : aorangiEvents;

  const [currentDate, setCurrentDate] = React.useState(
    moment().startOf('isoWeek').toDate()
  );

  const handleNavigate = (date: Date, view: string, action: string) => {
    if (view === 'agenda') {
      if (action === 'NEXT') {
        setCurrentDate(moment(currentDate).add(1, 'week').startOf('isoWeek').toDate());
      } else if (action === 'PREV') {
        setCurrentDate(moment(currentDate).subtract(1, 'week').startOf('isoWeek').toDate());
      } else if (action === 'TODAY') {
        setCurrentDate(moment().startOf('isoWeek').toDate());
      }
    } else {
      setCurrentDate(date);
    }
  };

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = React.useState<MyEvent[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectEvent = (event: MyEvent) => {
    const date = moment(event.start).startOf('day');
    const dayEvents = activeEvents.filter(e =>
      moment(e.start).startOf('day').isSame(date)
    );
    setSelectedDate(event.start);
    setSelectedEvents(dayEvents);
    onOpen();
  };

  const MyCalendar = () => (
    <div>
      <PageTitle mainText='SCHEDULE' image={TitleImage} />
      <div className={isDesktopView ? "schedulePageContainerDesktop" : "schedulePageContainerMobile"}>
        <Calendar
          localizer={localizer}
          events={activeEvents}
          components={{
            toolbar: (props) => (
              <CustomToolbar
                {...props}
                calendarMode={calendarMode}
                onCalendarModeChange={setCalendarMode}
              />
            ),
          }}
          startAccessor="start"
          endAccessor="end"
          style={{ height: isDesktopView ? 1000 : 800 }}
          views={['month', 'agenda']}
          defaultView={isDesktopView ? 'month' : 'agenda'}
          eventPropGetter={eventStyleGetter}
          length={6}
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          formats={{
            agendaDateFormat: 'DD/MM/YYYY',
            agendaHeaderFormat: ({ start, end }) =>
              `${moment(start).format('DD/MM/YYYY')} – ${moment(end).format('DD/MM/YYYY')}`,
          }}
        />
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedDate && moment(selectedDate).format('dddd, DD MMMM YYYY')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedEvents.map((event, index) => (
              <Flex
                key={index}
                align="center"
                gap={3}
                py={2}
                borderBottom={index < selectedEvents.length - 1 ? '1px solid' : 'none'}
                borderColor="gray.100"
              >
                <Box
                  w={3}
                  h={3}
                  borderRadius="sm"
                  flexShrink={0}
                  bg={
                    event.gender === 'mens' ? '#267703' :
                    event.gender === 'womens' ? '#2b6cb0' :
                    event.gender === 'mensAorangi' ? '#267703' :
                    '#2b6cb0'
                  }
                />
                <Text>{event.title}</Text>
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );

  return (
    <div>{MyCalendar()}</div>
  );
}