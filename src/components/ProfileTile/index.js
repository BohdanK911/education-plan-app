import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  Typography,
  Button,
  MenuList,
  MenuItem,
  Popper,
  ClickAwayListener,
  Paper,
  Grow
} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';

const ProfileTile = ({ photo, children: title }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => setOpen(prevOpen => !prevOpen);
  const signOut = () => firebase.auth().signOut();

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return null;

    setOpen(false);
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) anchorRef.current.focus();

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        style={{ marginLeft: 'auto', textTransform: 'none' }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup={'true'}
        onClick={handleToggle}
      >
        <Grid container style={{ width: 'max-content' }} alignItems={'center'} spacing={2}>
          <Grid item>
            <Typography>{title}</Typography>
          </Grid>

          <Grid item>
            <Avatar alt={title} src={photo || '#'} />
          </Grid>
        </Grid>
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper style={{ width: anchorRef?.current.offsetWidth }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={signOut}>Sign out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

ProfileTile.propTypes = {
  photo: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default ProfileTile;
