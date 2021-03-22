import { useState } from 'react';
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
import { Checkbox } from '@material-ui/core';

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
  const [state, setState] = useState({ weekendVisible: true, currentEvents: [], sidebar: false });
  const { weekendVisible, currentEvents, sidebar } = state;
  const classes = useStyles();
  const theme = useTheme();
  const handleState = (name, value) => setState(state => ({ ...state, [name]: value }));

  const handleEventContent = ({ timeText, event: { title } }) => (
    <>
      <Typography>{timeText}</Typography>
      <Typography>{title}</Typography>
    </>
  );
  const handleEventClick = ({ event: { remove, title } }) => {
    if (confirm(`Delete the event '${title}'?`)) remove();
  };

  const handleDateSelect = ({ view: { calendar }, startStr: start, endStr: end, allDay }) => {
    let title = prompt('Enter a new title');

    calendar.unselect(); // clear date selection
    if (title) calendar.addEvent({ id: createEventId(), title, start, end, allDay });
  };

  const handleSideBarOpen = () => handleState('sidebar', !sidebar);
  const handleEventsSet = events => handleState('currentEvents', events);

  return (
    <page className={'management-calendar'}>
      <main className={'management-calendar-main'}>
        <div className={classes.root}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleSideBarOpen}
              edge="start"
              className={clsx(classes.menuButton, sidebar && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={sidebar}
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
              <ListItem role={undefined} dense button onClick={() => handleState('weekendVisible', !weekendVisible)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={weekendVisible}
                    // tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={'Toggle weekends'} />
              </ListItem>
            </List>
            <List>
              {currentEvents.map(({ start, title }) => (
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
            initialView="dayGridMonth"
            editable={!true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={handleEventContent} // custom render function
            eventClick={handleEventClick}
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
