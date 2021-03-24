import { useEffect, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './components/EventsUtils';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Typography from '@material-ui/core/Typography';

import './index.css';
import {
  Checkbox,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField
} from '@material-ui/core';
import Modal from 'components/Modal';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { roundToNearestMinutes } from 'date-fns/esm';
import { addHours } from 'date-fns';
import { themeColors } from 'app/theme';
import DrawerCalendar from './components/Drawer';

const ManagementCalendar = () => {
  const [state, setState] = useState({
    weekendVisible: true,
    currentEvents: [],
    sideBarIsOpen: false,
    modalDeleteEventIsOpen: false,
    modalSelectEventIsOpen: false,
    modalEditEventIsOpen: false,
    modalEventTitleSelectIsOpen: false,
    currentEventSelectClick: {
      title: '',
      allDay: false,
      end: '',
      start: '',
      id: 1,
      calendar: '',
      backgroundColor: themeColors.main.primary,
      textColor: '#000'
    }
  });
  console.log(state.currentEvents);
  const handleEventContent = ({ timeText, event: { title, allDay, backgroundColor, textColor, borderColor } }) => {
    return (
      <>
        <Typography>{timeText}</Typography>
        {allDay ? <Typography variant={'button'}>{'Event for all day'}</Typography> : null}
        <Typography>{title}</Typography>
      </>
    );
  };

  const handleWeekendVisible = () => setState(state => ({ ...state, weekendVisible: !state.weekendVisible }));

  const handleEventModalDeleteClick = ({ event: { remove, title } }) =>
    setState(state => ({ ...state, currentEventSelectClick: { remove, title }, modalDeleteEventIsOpen: true }));

  const handleEventModalDeleteCancel = () => setState(state => ({ ...state, modalDeleteEventIsOpen: false }));

  const handleEventModalSelectCancel = () => setState(state => ({ ...state, modalSelectEventIsOpen: false }));

  const handleEventModalEditCancel = () => setState(state => ({ ...state, modalEditEventIsOpen: false }));

  const handleEventModalDeleteSubmit = () => {
    setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  };

  const handleEventModalEditSubmit = () => {
    setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  };

  // console.log();

  const handleEventModalSelectSubmit = () => {
    const { title, start, calendar, end, allDay, backgroundColor } = state.currentEventSelectClick;

    if (state.currentEventSelectClick.title)
      calendar.addEvent({
        id: createEventId(),
        title,
        start,
        end,
        backgroundColor,
        allDay
      });
    setState(state => ({
      ...state,
      modalSelectEventIsOpen: false,
      currentEventSelectClick: { ...state.currentEventSelectClick, title: '' }
    }));
  };

  const handleEventModalSelectClick = ({ view: { calendar }, startStr: start, endStr: end, allDay }) => {
    console.log(end);
    setState(state => ({
      ...state,
      currentEventSelectClick: { ...state.currentEventSelectClick, start, end, calendar, allDay },
      modalSelectEventIsOpen: true
    }));
  };
  const handleEventModalEditClick = e => {
    // console.log(getCurrentData());
    // setStart(100000);
    console.log(e.view.getCurrentData());
    setState(state => ({ ...state, modalEditEventIsOpen: true }));
  };

  const handleSideBarOpen = () => setState(state => ({ ...state, sideBarIsOpen: !state.sideBarIsOpen }));

  const handleEventsSet = events => setState(state => ({ ...state, currentEvents: events }));

  const modalGropeArr = [
    {
      isOpen: state.modalDeleteEventIsOpen,
      onCancel: handleEventModalDeleteCancel,
      onSubmit: handleEventModalDeleteSubmit,
      title: `Did you sure that you wanna delete ${state.currentEventSelectClick.title} event?`,
      buttonSubmitText: 'Delete'
    },
    {
      isOpen: state.modalEditEventIsOpen,
      onCancel: handleEventModalEditCancel,
      onSubmit: handleEventModalEditSubmit,
      title: (
        <>
          <DialogTitle id={'form-dialog-title'}> Please edit a event title.</DialogTitle>
          {/* <DialogContent> */}
          {/* <DialogContentText>
              <Typography variant={'body2'} component={'p'}></Typography>
            </DialogContentText> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify={'space-between'} spacing={2}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant={'inline'}
                  format={'MM/dd/yyyy'}
                  margin={'normal'}
                  label={'Date start event'}
                  value={state.currentEventSelectClick.dayStart}
                  onChange={date =>
                    setState(state => ({
                      ...state,
                      currentEventSelectClick: { ...state.currentEventSelectClick, dayStart: date }
                    }))
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant={'inline'}
                  format={'MM/dd/yyyy'}
                  margin={'normal'}
                  label={'Data end event'}
                  value={state.currentEventSelectClick.dayEnd}
                  onChange={date =>
                    setState(state => ({
                      ...state,
                      currentEventSelectClick: { ...state.currentEventSelectClick, dayEnd: date }
                    }))
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  margin={'normal'}
                  label={'Time start event'}
                  value={state.currentEventSelectClick.timeStart}
                  onChange={date =>
                    setState(state => ({
                      ...state,
                      currentEventSelectClick: { ...state.currentEventSelectClick, timeStart: date }
                    }))
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  margin={'normal'}
                  label={'Time end event'}
                  value={state.currentEventSelectClick.timeEnd}
                  onChange={date =>
                    setState(state => ({
                      ...state,
                      currentEventSelectClick: { ...state.currentEventSelectClick, timeEnd: date }
                    }))
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          <TextField
            autoFocus
            margin={'dense'}
            label={'Event text'}
            type={'text'}
            fullWidth
            value={state.currentEventSelectClick.title}
            onChange={({ target: { value } }) =>
              setState(state => ({
                ...state,
                currentEventSelectClick: { ...state.currentEventSelectClick, title: value }
              }))
            }
          />
          {/* </DialogContent> */}
        </>
      )
    },
    {
      isOpen: state.modalSelectEventIsOpen,
      onCancel: handleEventModalSelectCancel,
      onSubmit: handleEventModalSelectSubmit,
      title: (
        <>
          <DialogTitle id={'form-dialog-title'}> Please write a event title.</DialogTitle>
          {/* <DialogContent> */}
          {/* <DialogContentText>
              <Typography variant={'body2'} component={'p'}></Typography>
            </DialogContentText> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify={'space-between'} spacing={2}>
              <Grid item xs={6}>
                {!state.currentEventSelectClick.allDay ? (
                  <>
                    <KeyboardDateTimePicker
                      ampm={false}
                      disableToolbar
                      variant={'inline'}
                      format={'yyyy/MM/dd HH:mm'}
                      margin={'normal'}
                      label={'Date start event'}
                      value={state.currentEventSelectClick.start}
                      onChange={date =>
                        setState(state => ({
                          ...state,
                          currentEventSelectClick: { ...state.currentEventSelectClick, start: date }
                        }))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                    <KeyboardDateTimePicker
                      ampm={false}
                      disableToolbar
                      variant={'inline'}
                      format={'yyyy/MM/dd HH:mm'}
                      margin={'normal'}
                      label={'Date start event'}
                      value={state.currentEventSelectClick.end}
                      onChange={date =>
                        setState(state => ({
                          ...state,
                          currentEventSelectClick: { ...state.currentEventSelectClick, end: date }
                        }))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </>
                ) : (
                  <>
                    <KeyboardDatePicker
                      disableToolbar
                      variant={'inline'}
                      format={'MM/dd/yyyy'}
                      margin={'normal'}
                      label={'Data end event'}
                      value={state.currentEventSelectClick.dayStart}
                      onChange={date =>
                        setState(state => ({
                          ...state,
                          currentEventSelectClick: { ...state.currentEventSelectClick, dayStart: date }
                        }))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant={'inline'}
                      format={'MM/dd/yyyy'}
                      margin={'normal'}
                      label={'Data end event'}
                      value={state.currentEventSelectClick.dayEnd}
                      onChange={date =>
                        setState(state => ({
                          ...state,
                          currentEventSelectClick: { ...state.currentEventSelectClick, dayEnd: date }
                        }))
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </>
                )}
              </Grid>

              <Grid item xs={6}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.currentEventSelectClick.allDay}
                        onChange={({ target: { checked } }) =>
                          setState(state => ({
                            ...state,
                            currentEventSelectClick: { ...state.currentEventSelectClick, allDay: checked }
                          }))
                        }
                      />
                    }
                    label={'Is event allDay ?'}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <div style={{ marginTop: '1em' }}>
            <TextField
              autoFocus
              margin={'dense'}
              label={'Event text'}
              type={'text'}
              fullWidth
              value={state.currentEventSelectClick.title}
              onChange={({ target: { value } }) =>
                setState(state => ({
                  ...state,
                  currentEventSelectClick: { ...state.currentEventSelectClick, title: value }
                }))
              }
            />
          </div>
          {/* </DialogContent> */}
        </>
      )
    }
  ];

  return (
    <page className={'management-calendar'}>
      <DrawerCalendar
        handleSideBarOpen={handleSideBarOpen}
        handleWeekendVisible={handleWeekendVisible}
        sideBarIsOpen={state.sideBarIsOpen}
        weekendVisible={state.weekendVisible}
        currentEvents={state.currentEvents}
      />
      {modalGropeArr.map(({ isOpen, onCancel, onSubmit, title, buttonSubmitText }, idx) => (
        <Modal
          isOpen={isOpen}
          onCancel={onCancel}
          onSubmit={onSubmit}
          title={title}
          key={idx}
          buttonSubmitText={buttonSubmitText}
        />
      ))}
      <div className={state.sideBarIsOpen ? 'management-calendar--blur ' : ''}></div>
      <main
        className={
          state.sideBarIsOpen ? 'management-calendar-main--blur management-calendar-main ' : 'management-calendar-main'
        }
      >
        <section className={'management-calendar-main'}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView={'dayGridMonth'}
            editable={!true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleEventModalSelectClick}
            eventContent={handleEventContent} // custom render function
            eventClick={handleEventModalEditClick}
            eventsSet={handleEventsSet} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventRemove={function(){}}
            */
            eventChange={() => alert('changed')}
            // eventBackgroundColor={'#000'}
            eventBorderColor={'transparent'}
            // eventTextColor={themeColors.main.primary}
            eventColor={themeColors.main.secondary}
          />
        </section>
      </main>
    </page>
  );
};

export default ManagementCalendar;
