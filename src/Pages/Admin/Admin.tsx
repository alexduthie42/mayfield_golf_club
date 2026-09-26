import React from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Calendar, momentLocalizer, type EventPropGetter } from 'react-big-calendar';
import type { ToolbarProps, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MobileWidth } from '../../CommonComponents/Globals';
import UseWindowSize from '../../CommonComponents/UseWindowSize';
import { EventsApi } from '../../api/apis/EventsApi';
import type { EventRequest } from '../../api/models/EventRequest';
import type { EventResponse } from '../../api/models/EventResponse';
import { EventType } from '../../api/models/EventType';
import {
  acquireAdminAccessToken,
  adminScopes,
  getAdminAccount,
  initializeEntraAuth,
  msalInstance,
} from '../../auth/entraAuth';
import type { AccountInfo } from '@azure/msal-browser';

interface CalendarEvent {
  id: string;
  title: string;
  details: string;
  eventType: EventType;
  start: Date;
  end: Date;
  isPlaceholder?: boolean;
}

interface EventForm {
  title: string;
  details: string;
  date: string;
  eventType: EventType;
}

const api = new EventsApi();

moment.locale('en', { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

const eventTypeLabels: Record<EventType, string> = {
  [EventType.MenMayfield]: "Men's Mayfield",
  [EventType.WomenMayfield]: "Ladies' Mayfield"
};

const eventTypeColours: Record<EventType, string> = {
  [EventType.MenMayfield]: '#267703',
  [EventType.WomenMayfield]: '#2b6cb0'
};

const eventStyleGetter: EventPropGetter<CalendarEvent> = (event) => ({
  style: {
    backgroundColor: event.isPlaceholder ? 'transparent' : eventTypeColours[event.eventType],
    borderRadius: '4px',
    color: 'white',
    boxShadow: event.isPlaceholder ? 'none' : undefined,
    cursor: event.isPlaceholder ? 'default' : 'pointer',
    pointerEvents: event.isPlaceholder ? 'none' : 'auto',
  },
});

type CalendarToolbarProps = ToolbarProps<CalendarEvent, object>;

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  label,
  onNavigate,
  onView,
  view,
}) => (
  <Box mb={4}>
    <Flex direction="column" gap={4} align="center">
      <Box className="calendarNavGridItem">
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
      </Box>
      <Box className="calendarNavGridItem">
        <ButtonGroup variant="solid" colorScheme="blue" w="100%">
          <Button w="33.33%" onClick={() => onNavigate('PREV')}>Prev</Button>
          <Button w="33.33%" onClick={() => onNavigate('TODAY')}>Today</Button>
          <Button w="33.33%" onClick={() => onNavigate('NEXT')}>Next</Button>
        </ButtonGroup>
      </Box>
      <Text fontSize="xl" fontWeight="semibold">{label}</Text>
      <Flex gap={6} wrap="wrap" justify="center">
        {Object.entries(eventTypeLabels).map(([type, name]) => (
          <Flex key={type} align="center" gap={2}>
            <Box w={3} h={3} borderRadius="sm" bg={eventTypeColours[type as EventType]} />
            <Text fontSize="sm">{name}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </Box>
);

const toCalendarEvent = (event: EventResponse): CalendarEvent => ({
  id: event.id,
  title: event.title,
  details: event.details,
  eventType: event.eventType,
  start: event.date,
  end: event.date,
});

const getEventsWithEmptyDays = (
  events: CalendarEvent[],
  currentDate: Date
): CalendarEvent[] => {
  const result = [...events];
  for (let offset = 0; offset < 5; offset++) {
    const day = moment(currentDate).add(offset, 'days').startOf('day');
    const hasEvents = events.some((event) =>
      moment(event.start).startOf('day').isSame(day)
    );
    if (!hasEvents) {
      result.push({
        id: `empty-${day.format('YYYY-MM-DD')}`,
        title: '',
        details: '',
        eventType: EventType.MenMayfield,
        start: day.toDate(),
        end: day.toDate(),
        isPlaceholder: true,
      });
    }
  }
  return result;
};

const AgendaEvent: React.FC<{ event: CalendarEvent }> = ({ event }) =>
  event.isPlaceholder ? null : <span>{event.title}</span>;

const dateTimeInputValue = (date: Date): string => moment(date).format('YYYY-MM-DDTHH:mm');

const emptyForm = (date: Date = new Date()): EventForm => ({
  title: '',
  details: '',
  date: dateTimeInputValue(date),
  eventType: EventType.MenMayfield,
});

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'An unexpected error occurred.';

export default function Admin() {
  const { width } = UseWindowSize();
  const isDesktopView = width > MobileWidth;
  const [account, setAccount] = React.useState<AccountInfo | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [eventsError, setEventsError] = React.useState<string | null>(null);
  const [isLoadingEvents, setIsLoadingEvents] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null);
  const [form, setForm] = React.useState<EventForm>(emptyForm());
  const [currentDate, setCurrentDate] = React.useState(
    moment().startOf('isoWeek').toDate()
  );
  const [currentView, setCurrentView] = React.useState<View>(
    isDesktopView ? 'month' : 'agenda'
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    let isActive = true;

    const initialize = async () => {
      try {
        const redirectResult = await initializeEntraAuth();
        const signedInAccount = getAdminAccount(redirectResult);
        if (!signedInAccount) return;

        const token = await acquireAdminAccessToken(signedInAccount);
        if (token && isActive) {
          setAccount(signedInAccount);
        }
      } catch (error) {
        console.error('Failed to initialize Entra authentication', error);
        if (isActive) {
          setAuthError(`Unable to authenticate with Microsoft: ${getErrorMessage(error)}`);
        }
      } finally {
        if (isActive) {
          setIsInitializing(false);
        }
      }
    };

    void initialize();
    return () => {
      isActive = false;
    };
  }, []);

  React.useEffect(() => {
    if (!account) return;

    let isActive = true;
    setIsLoadingEvents(true);
    setEventsError(null);

    api.getEvents()
      .then((response) => {
        if (isActive) {
          setEvents(response.map(toCalendarEvent));
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to load admin events', error);
        if (isActive) {
          setEventsError(`Unable to load events: ${getErrorMessage(error)}`);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoadingEvents(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [account]);

  const openCreateForm = (date: Date = new Date()) => {
    setSelectedEvent(null);
    setForm(emptyForm(date));
    setEventsError(null);
    onOpen();
  };

  const openEditForm = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setForm({
      title: event.title,
      details: event.details,
      date: dateTimeInputValue(event.start),
      eventType: event.eventType,
    });
    setEventsError(null);
    onOpen();
  };

  const getAuthorizationHeaders = async (
    hasJsonBody: boolean = false
  ): Promise<Record<string, string> | null> => {
    if (!account) return null;
    const accessToken = await acquireAdminAccessToken(account);
    return accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
          ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
        }
      : null;
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!account) return;

    const date = new Date(form.date);
    if (Number.isNaN(date.getTime())) {
      setEventsError('Enter a valid event date and time.');
      return;
    }

    const eventRequest: EventRequest = {
      title: form.title.trim(),
      details: form.details.trim(),
      date,
      eventType: form.eventType,
    };

    setIsSaving(true);
    setEventsError(null);
    try {
      const headers = await getAuthorizationHeaders(true);
      if (!headers) return;

      if (selectedEvent) {
        await api.updateEvent(
          { eventId: selectedEvent.id, eventRequest },
          { headers }
        );
        setEvents((currentEvents) => currentEvents.map((item) =>
          item.id === selectedEvent.id
            ? { ...item, ...eventRequest, start: date, end: date }
            : item
        ));
      } else {
        const createdEvents = await api.createEvents(
          { eventRequest: [eventRequest] },
          { headers }
        );
        setEvents((currentEvents) => [
          ...currentEvents,
          ...createdEvents.map(toCalendarEvent),
        ]);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save admin event', error);
      setEventsError(`Unable to save event: ${getErrorMessage(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!account || !selectedEvent) return;
    if (!window.confirm(`Delete "${selectedEvent.title}"?`)) return;

    setIsSaving(true);
    setEventsError(null);
    try {
      const headers = await getAuthorizationHeaders();
      if (!headers) return;

      await api.deleteEvent({ eventId: selectedEvent.id }, { headers });
      setEvents((currentEvents) => currentEvents.filter(
        (event) => event.id !== selectedEvent.id
      ));
      onClose();
    } catch (error) {
      console.error('Failed to delete admin event', error);
      setEventsError(`Unable to delete event: ${getErrorMessage(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await msalInstance.loginRedirect({ scopes: adminScopes });
    } catch (error) {
      console.error('Failed to start Entra sign-in', error);
      setAuthError(`Unable to start Microsoft sign-in: ${getErrorMessage(error)}`);
    }
  };

  const handleSignOut = async () => {
    if (!account) return;
    try {
      await msalInstance.logoutRedirect({ account });
    } catch (error) {
      console.error('Failed to sign out of Entra', error);
      setAuthError(`Unable to sign out: ${getErrorMessage(error)}`);
    }
  };

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

  const activeEvents = getEventsWithEmptyDays(events, currentDate);

  if (isInitializing) {
    return (
      <Container maxW="container.lg" py={16} centerContent>
        <Spinner size="lg" color="blue.500" />
        <Text mt={4}>Checking Microsoft sign-in…</Text>
      </Container>
    );
  }

  if (!account) {
    return (
      <Container maxW="container.sm" py={16}>
        <Heading mb={4}>Admin sign in</Heading>
        <Text mb={6}>Sign in with your Microsoft account to manage club events.</Text>
        {authError && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {authError}
          </Alert>
        )}
        <Button colorScheme="blue" onClick={handleSignIn}>Sign in with Microsoft</Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={6} gap={4} wrap="wrap">
        <Box>
          <Heading>Event administration</Heading>
          <Text color="gray.600">{account.username}</Text>
        </Box>
        <ButtonGroup>
          <Button colorScheme="green" onClick={() => openCreateForm()}>
            Add event
          </Button>
          <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
        </ButtonGroup>
      </Flex>

      {authError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {authError}
        </Alert>
      )}
      {eventsError && (
        <Alert status="error" mb={4} role="alert">
          <AlertIcon />
          {eventsError}
        </Alert>
      )}
      {isLoadingEvents ? (
        <Flex justify="center" py={12}><Spinner size="lg" color="blue.500" /></Flex>
      ) : (
        <div className={isDesktopView ? 'schedulePageContainerDesktop' : 'schedulePageContainerMobile'}>
          <Calendar<CalendarEvent>
            localizer={localizer}
            events={activeEvents}
            components={{
              toolbar: CalendarToolbar,
              agenda: { event: AgendaEvent },
            }}
            startAccessor="start"
            endAccessor="end"
            view={currentView}
            onView={setCurrentView}
            views={['month', 'agenda']}
            selectable
            onSelectSlot={({ start }) => openCreateForm(
              start instanceof Date ? start : new Date(start)
            )}
            onSelectEvent={(event) => {
              if (!event.isPlaceholder) {
                openEditForm(event);
              }
            }}
            eventPropGetter={eventStyleGetter}
            style={{
              height: currentView === 'agenda'
                ? 'auto'
                : isDesktopView ? 1000 : 800,
            }}
            length={4}
            date={currentDate}
            onNavigate={handleNavigate}
            formats={{
              agendaDateFormat: 'DD/MM/YYYY',
              agendaHeaderFormat: ({ start, end }) =>
                `${moment(start).format('DD/MM/YYYY')} – ${moment(end).format('DD/MM/YYYY')}`,
            }}
          />
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSave}>
          <ModalHeader>{selectedEvent ? 'Edit event' : 'Add event'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                maxLength={200}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Details</FormLabel>
              <Textarea
                value={form.details}
                onChange={(event) => setForm({ ...form, details: event.target.value })}
                maxLength={2000}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Date and time</FormLabel>
              <Input
                type="datetime-local"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Event type</FormLabel>
              <Select
                value={form.eventType}
                onChange={(event) => setForm({
                  ...form,
                  eventType: event.target.value as EventType,
                })}
              >
                {Object.entries(eventTypeLabels).map(([type, label]) => (
                  <option key={type} value={type}>{label}</option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Box>
              {selectedEvent && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={handleDelete}
                  isLoading={isSaving}
                  type="button"
                >
                  Delete
                </Button>
              )}
            </Box>
            <ButtonGroup>
              <Button variant="ghost" onClick={onClose} isDisabled={isSaving} type="button">Cancel</Button>
              <Button colorScheme="blue" type="submit" isLoading={isSaving}>
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
