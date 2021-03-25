import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuid } from 'uuid';
import { Container, Typography, Popover, MenuList, MenuItem } from '@material-ui/core';
import EventModal from 'components/EventModal';
import {
  INITIAL_CREATE_EVENT_MODAL_PROPS,
  DEFAULT_CREATE_EVENT_MODAL_PROPS,
  DEFAULT_EDIT_EVENT_MODAL_PROPS
} from './data';
import './index.css';

const Calendar = () => {
  const [state, setState] = useState({
    weekendVisible: true,
    currentEvents: [],
    modalDeleteEventIsOpen: false,
    modalSelectEventIsOpen: false,
    modalEditEventIsOpen: false,
    modalEventTitleSelectIsOpen: false
  });
  const [calendarState, setCalendarState] = useState([]);
  const [eventModalState, setEventModalState] = useState(INITIAL_CREATE_EVENT_MODAL_PROPS);
  const [contextMenuState, setContextMenuState] = useState({
    isOpen: false,
    isEvent: false,
    position: { top: 0, left: 0 }
  });

  const calendarRef = useRef(null);

  const handleEventContent = event => {
    console.log(event);

    return (
      <>
        <Typography>{event.timeText}</Typography>
        <Typography>{event.event.title}</Typography>
      </>
    );
  };

  const createEvent = ({ title, description, isAllDay, startDate, endDate, startTime, endTime }) => {
    const calendarApi = calendarRef.current.getApi();

    const eventObj = {
      id: uuid(),
      title,
      description,
      start: startDate,
      date: endDate,
      startTime: startTime,
      dateTime: endTime,
      allDay: isAllDay
    };

    console.log(calendarApi.getEvents());

    calendarApi.addEvent(eventObj);
    setCalendarState(state => [...state, eventObj]);

    setTimeout(() => console.log(calendarApi.getEvents()), 2000);

    calendarApi.next();
  };

  // const handleEventModalDeleteClick = ({ event: { remove, title } }) =>
  //   setState(state => ({ ...state, currentEventSelectClick: { remove, title }, modalDeleteEventIsOpen: true }));

  // const handleEventModalDeleteCancel = () => setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  // const handleEventModalSelectCancel = () => setState(state => ({ ...state, modalSelectEventIsOpen: false }));
  // const handleEventModalEditCancel = () => setState(state => ({ ...state, modalEditEventIsOpen: false }));
  // const handleEventModalDeleteSubmit = () => setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  // const handleEventModalEditSubmit = () => setState(state => ({ ...state, modalDeleteEventIsOpen: false }));

  // const handleEventModalSelectSubmit = () => {
  //   const { title, start, calendar, end, allDay } = state.currentEventSelectClick;

  //   if (state.currentEventSelectClick.title)
  //     calendar.addEvent({
  //       id: createEventId(),
  //       title,
  //       start,
  //       end,
  //       allDay
  //     });
  //   setState(state => ({
  //     ...state,
  //     modalSelectEventIsOpen: false,
  //     currentEventSelectClick: { ...state.currentEventSelectClick, title: '' }
  //   }));
  // };

  // const handleEventModalSelectClick = ({ view: { calendar }, startStr: start, endStr: end, allDay }) => {
  //   setState(state => ({
  //     ...state,
  //     currentEventSelectClick: { ...state.currentEventSelectClick, start, end, calendar, allDay },
  //     modalSelectEventIsOpen: true
  //   }));
  // };

  const handleEventModalEditClick = () => {
    setState(state => ({ ...state, modalEditEventIsOpen: true }));
  };

  const handleEventsSet = events => setCalendarState(events);

  const closeCreateEventModal = () => setEventModalState(INITIAL_CREATE_EVENT_MODAL_PROPS);

  const openCreateEventModal = evt =>
    setEventModalState(state => ({
      ...state,
      ...DEFAULT_CREATE_EVENT_MODAL_PROPS,
      event: evt,
      onCancel: closeCreateEventModal,
      onSubmit: createEvent,
      calendarRef
    }));

  // const modalGropeArr = [
  //   {
  //     isOpen: state.modalDeleteEventIsOpen,
  //     onCancel: handleEventModalDeleteCancel,
  //     onSubmit: handleEventModalDeleteSubmit,
  //     title: `Did you sure that you wanna delete ${state.currentEventSelectClick.title} event?`,
  //     buttonSubmitText: 'Delete'
  //   },
  //   {
  //     isOpen: state.modalEditEventIsOpen,
  //     onCancel: handleEventModalEditCancel,
  //     onSubmit: handleEventModalEditSubmit,
  //     title: 'Ok'
  //   },
  //   {
  //     isOpen: state.modalSelectEventIsOpen,
  //     onCancel: handleEventModalSelectCancel,
  //     onSubmit: handleEventModalSelectSubmit,
  //     title: 'Ok'
  //   }
  // ];

  const handleRightClick = e => {
    e.preventDefault();

    if (!e.target.closest('.fc-daygrid-day')) return null;

    if (e.target.closest('.fc-daygrid-event'))
      return setContextMenuState({
        isOpen: true,
        isEvent: true,
        position: { top: e.clientY, left: e.clientX }
      });

    return setContextMenuState({
      isOpen: true,
      isEvent: false,
      position: { top: e.clientY, left: e.clientX }
    });
  };

  const handlePopoverClose = e => {
    if (e?.preventDefault) e.preventDefault();

    setContextMenuState(state => ({ ...state, isOpen: false }));
  };

  // const deleteEvent = event => {};

  return (
    <>
      <Popover
        open={contextMenuState.isOpen}
        onClose={handlePopoverClose}
        onContextMenu={handlePopoverClose}
        anchorReference={'anchorPosition'}
        anchorPosition={contextMenuState.position}
      >
        <MenuList>
          <MenuItem>Add event</MenuItem>

          {contextMenuState.isEvent && (
            <>
              <MenuItem>Edit event</MenuItem>
              <MenuItem>Delete event</MenuItem>
            </>
          )}
        </MenuList>
      </Popover>

      <div className={'management-calendar'}>
        <EventModal {...eventModalState} />

        <Container component={'main'} onContextMenu={handleRightClick} disableGutters>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView={'dayGridMonth'}
            editable={false}
            selectable
            selectMirror
            dayMaxEvents
            weekends={state.weekendVisible}
            // events={calendarState}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={openCreateEventModal}
            eventContent={handleEventContent} // custom render function
            eventClick={handleEventModalEditClick}
            eventsSet={handleEventsSet} // called after events are initialized/added/changed/removed
            eventChange={() => alert('changed')}
            eventBackgroundColor={'#768d5cd4'}
            eventBorderColor={'transparent'}
            eventTextColor={'#222629'}
            eventColor={'#000'}
          />
        </Container>
      </div>
    </>
  );
};

export default Calendar;
