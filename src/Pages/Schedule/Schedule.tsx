import React from 'react';
import './../../App.css';
import TitleImage from './Content/TitleImage.jpg'
import { Box } from '@chakra-ui/react'
import { Button, ButtonGroup, Grid, GridItem, Text, Card, CardHeader, CardBody, Stack, Flex, Divider, CardFooter } from '@chakra-ui/react';
import PageTitle from '../../CommonComponents/PageTitle';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { ToolbarProps, EventPropGetter, View  } from 'react-big-calendar';
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
import image1 from './Content/Image1.jpg';
import image2 from './Content/Image2.jpg';

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

const mensColour = '#267703';
const womensColour = '#2b6cb0';

const eventStyleGetter: EventPropGetter<MyEvent> = (event) => ({
  style: {
    backgroundColor: !event.title ? 'transparent' :
      event.gender === 'mens' ? mensColour :
      event.gender === 'womens' ? womensColour :
      event.gender === 'mensAorangi' ? mensColour :
      womensColour,
    color: 'white',
    borderRadius: '4px',
    boxShadow: !event.title ? 'none' : undefined,
    cursor: !event.title ? 'default' : 'pointer',
    pointerEvents: !event.title ? 'none' : 'auto',
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
                <Box w={3} h={3} borderRadius="sm" bg={mensColour} />
                <Text fontSize="sm">Men's Events</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Box w={3} h={3} borderRadius="sm" bg={womensColour} />
                <Text fontSize="sm">Ladies' Events</Text>
              </Flex>
            </Flex>
        </GridItem>

      </Grid>
    </Box>
  );
};


const daysOfPlay = (
  <Card className='daysOfPlayCard'>
    <CardHeader display='flex' justifyContent='center'>
      <Text className='textLargeBold'>DAYS OF PLAY</Text>
    </CardHeader>
    <CardBody pt={0}>
      <Stack spacing={2}>
        <Flex direction="column">
          <Text className='textLarge'>Saturday - Mens</Text>
          <Text className='textMedium'>Discs in by 12.30pm - Draw 1.00pm</Text>
        </Flex>
        <Divider />
        <Flex direction="column">
          <Text className='textLarge'>Tuesday - Ladies</Text>
          <Text className='textMedium'>Discs in by 10.10am - Start 10.30am</Text>
          <Text className='textMedium'>Daylight Savings - Discs in by 9.10am - Start 9.30am</Text>
        </Flex>
        <Divider />
        <Flex direction="column">
          <Text className='textLarge'>Wednesday - Twilight</Text>
          <Text className='textMedium'>Draw 4.00pm & 6.00pm November - February</Text>
          <Text className='textMedium'>Draw 1.00pm March - October</Text>
          <Text className='textMedium'>Report 15 minutes prior to start</Text>
        </Flex>
        <Divider />
        <Flex direction="column">
          <Text className='textLarge'>Thursday - 9 Hole</Text>
          <Text className='textMedium'>Draw 9.15am for 9.30am start</Text>
        </Flex>
        <Divider />
      </Stack>
    </CardBody>
  </Card>
);

const scheduleDownload = (
  <Card className='scheduleDownloadCard'>
    <CardHeader display='flex' justifyContent='center'>
      <Text className='textLargeBold'>SCHEDULE DOWNLOAD</Text>
    </CardHeader>
    <CardBody pt={0}>
      <Stack spacing={3}>
        <Button
          as="a"
          href={`${process.env.PUBLIC_URL}/Content/MayfieldGolfClubMensCalander2026.pdf`}
          download
          colorScheme="green"
          variant="outline"
          w="100%"
        >
          Men's Schedule 2026
        </Button>
        <Button
          as="a"
          href={`${process.env.PUBLIC_URL}/Content/MayfieldGolfLadiesCalendar2026.pdf`}
          download
          colorScheme="blue"
          variant="outline"
          w="100%"
        >
          Ladies' Schedule 2026
        </Button>
      </Stack>
    </CardBody>
  </Card>
);

const getEventsWithEmptyDays = (events: MyEvent[], currentDate: Date): MyEvent[] => {
  const result = [...events];
  for (let i = 0; i <= 6; i++) {
    const day = moment(currentDate).add(i, 'days').startOf('day');
    const hasEvents = events.some(e =>
      moment(e.start).startOf('day').isSame(day)
    );
    if (!hasEvents) {
      result.push({
        title: '',
        start: day.toDate(),
        end: day.toDate(),
        gender: 'mens', // placeholder, won't be visible
      });
    }
  }
  return result;
};

const AgendaEvent: React.FC<{ event: MyEvent }> = ({ event }) => {
  if (!event.title) return null;
  return <span>{event.title}</span>;
};

export default function Schedule() {
  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;

  moment.locale('en', { week: { dow: 1 } });
  const localizer = momentLocalizer(moment);

  const [calendarMode, setCalendarMode] = React.useState<CalendarMode>('club');

  const [currentDate, setCurrentDate] = React.useState(
    moment().startOf('isoWeek').toDate()
  );

  const rawEvents = calendarMode === 'club' ? clubEvents : aorangiEvents;
  const activeEvents = getEventsWithEmptyDays(rawEvents, currentDate);

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

  const [currentView, setCurrentView] = React.useState<View>(
    isDesktopView ? 'month' : 'agenda'
  );

  const handleView = (view: View) => {
    setCurrentView(view);
  };

  const MyCalendar = () => (
    <div>
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
            agenda: {
              event: AgendaEvent,
            },
          }}
          startAccessor="start"
          endAccessor="end"
          view={currentView}
          onView={handleView}
          style={{
            height: currentView === 'agenda'
              ? 'auto'
              : isDesktopView ? 1000 : 800
          }}
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
                    event.gender === 'mens' ? mensColour :
                    event.gender === 'womens' ? womensColour :
                    event.gender === 'mensAorangi' ? mensColour :
                    womensColour
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
    <div>
      <PageTitle mainText='SCHEDULE' image={TitleImage} />
      {isDesktopView ? (
        <div>
          {MyCalendar()}
          <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '36px' }}>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <GridItem colSpan={1} display='flex'>
                {daysOfPlay}
              </GridItem>
              <GridItem colSpan={1} display='flex'>
                {scheduleDownload}
              </GridItem>
            </Grid>
          </div>
        </div>
      ) : (
        <div className='homePageContainerMobile'>
          {MyCalendar()}
          <img src={image1} />
          {daysOfPlay}
          <img src={image2} />
          {scheduleDownload}
        </div>
      )}
    </div>
  );
}