import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { Checkbox, Switch } from '@material-ui/core';
import { formatDate } from '@fullcalendar/common';

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

const DrawerCalendar = ({ handleSideBarOpen, sideBarIsOpen, handleWeekendVisible, weekendVisible, currentEvents }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <Toolbar>
        <IconButton
          color={'inherit'}
          aria-label={'open drawer'}
          onClick={handleSideBarOpen}
          edge={'start'}
          className={clsx(classes.menuButton, sideBarIsOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant={'persistent'}
        anchor={'left'}
        open={sideBarIsOpen}
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
          <ListItem role={undefined} dense button onClick={handleWeekendVisible}>
            <ListItemIcon>
              <Switch
                edge={'start'}
                checked={weekendVisible}
                // tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={'Toggle weekends'} />
          </ListItem>
        </List>
        <List>
          {currentEvents.map(({ start, title, id }) => {
            console.log(id);

            return (
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
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

DrawerCalendar.propTypes = {
  currentEvents: PropTypes.shape({
    map: PropTypes.func
  }),
  handleSideBarOpen: PropTypes.any,
  handleWeekendVisible: PropTypes.any,
  sideBarIsOpen: PropTypes.bool,
  weekendVisible: PropTypes.bool
};

export default DrawerCalendar;
