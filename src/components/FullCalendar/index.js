import { useEffect, useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './components/EventsUtils';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './index.css';
import { Checkbox, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import Modal from 'components/Modal';

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 65
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const ManagementCalendar = ({ window }) => {
  const [state, setState] = useState({
    weekendVisible: true,
    currentEvents: [],
    sideBarIsOpen: false,
    modalDeleteEventIsOpen: false,
    modalSelectEventIsOpen: false,
    modalEditEventIsOpen: false,
    modalEventTitleSelectIsOpen: false,
    currentEventClick: {
      // remove: () => alert('delete'),
      title: ''
    },
    currentEventSelectClick: {
      title: '',
      allDay: true,
      end: '',
      start: '',
      id: 1,
      calendar: ''
    }
  });

  const classes = useStyles();
  const theme = useTheme();

  const handleEventContent = ({ timeText, event: { title } }) => (
    <>
      <Typography>{timeText}</Typography>
      <Typography>{title}</Typography>
    </>
  );

  const handleEventModalDeleteClick = ({ event: { remove, title } }) =>
    setState(state => ({ ...state, currentEventClick: { remove, title }, modalDeleteEventIsOpen: true }));

  const handleEventModalDeleteCancel = () => setState(state => ({ ...state, modalDeleteEventIsOpen: false }));

  const handleEventModalSelectCancel = () => setState(state => ({ ...state, modalSelectEventIsOpen: false }));

  const handleEventModalEditCancel = () => setState(state => ({ ...state, modalSelectEventIsOpen: false }));

  const handleEventModalDeleteSubmit = () => {
    setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  };

  const handleEventModalEditSubmit = () => {
    setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  };
  // console.log();

  const handleEventModalSelectSubmit = () => {
    const { title, start, calendar, end, allDay } = state.currentEventSelectClick;

    if (state.currentEventSelectClick.title)
      calendar.addEvent({
        id: createEventId(),
        title,
        start,
        end,
        allDay
      });
    setState(state => ({
      ...state,
      modalSelectEventIsOpen: false,
      currentEventSelectClick: { ...state.currentEventSelectClick, title: '' }
    }));
  };

  const handleEventModalSelectClick = ({ view: { calendar }, startStr: start, endStr: end, allDay }) =>
    setState(state => ({
      ...state,
      currentEventSelectClick: { ...state.currentEventSelectClick, start, end, allDay, calendar },
      modalSelectEventIsOpen: true
    }));

  const handleEventModalEditClick = ({ view: { getCurrentData } }) => {
    console.log(getCurrentData());
  };

  const handleSideBarOpen = () => setState(state => ({ ...state, sideBarIsOpen: !state.sideBarIsOpen }));

  const handleEventsSet = events => setState(state => ({ ...state, currentEvents: events }));

  const modalGropeArr = [
    {
      isOpen: state.modalDeleteEventIsOpen,
      onCancel: handleEventModalDeleteCancel,
      onSubmit: handleEventModalDeleteSubmit,
      title: `Did you sure that you wanna delete ${state.currentEventClick.title} event?`,
      buttonSubmitText: 'Delete'
    },
    {
      isOpen: state.modalEditEventIsOpen,
      onCancel: handleEventModalEditCancel,
      onSubmit: handleEventModalEditSubmit,
      title: 'You can easily change the event'
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
    }
  ];

  return (
    <page className={'management-calendar'}>
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

      <main className={'management-calendar-main'}>
        <div className={classes.root}>
          <Toolbar>
            <IconButton
              color={'inherit'}
              aria-label={'open drawer'}
              onClick={handleSideBarOpen}
              edge={'start'}
              className={clsx(classes.menuButton, state.sideBarIsOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            className={classes.drawer}
            variant={'persistent'}
            anchor={'left'}
            open={state.sideBarIsOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleSideBarOpen}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                'Select dates and you will be prompted to create a new event',
                'Drag, drop, and resize events',
                'Click an event to delete it'
              ].map(text => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem
                role={undefined}
                dense
                button
                onClick={() => handleState('weekendVisible', !state.weekendVisible)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge={'start'}
                    checked={state.weekendVisible}
                    // tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={'Toggle weekends'} />
              </ListItem>
            </List>
            <List>
              {state.currentEvents.map(({ start, title }) => (
                <ListItem key={'shoruid()'} className={'management-calendar-sidebar__all-events-list-items'} button>
                  <ListItemText>
                    {formatDate(start, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </ListItemText>
                  <p>{title}</p>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
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
            eventBackgroundColor={'#768d5cd4'}
            eventBorderColor={'transparent'}
            eventTextColor={'#222629'}
            eventColor={'#000'}
          />
        </section>
      </main>
    </page>
  );
};

ManagementCalendar.propTypes = {
  window: PropTypes.func
};

export default ManagementCalendar;
