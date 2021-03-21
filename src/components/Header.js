import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import useSignedInUser from 'hooks/useSignedInUser';
import ProfileTile from 'components/ProfileTile';

const Header = ({ title }) => {
  const signedInUser = useSignedInUser();

  useEffect(() => {
    console.info(signedInUser);
  }, [signedInUser]);

  return (
    <AppBar position={'fixed'}>
      <Toolbar>
        <Typography variant={'h6'}>{title}</Typography>
        {signedInUser ? <ProfileTile photo={signedInUser.photoURL}>{signedInUser.displayName}</ProfileTile> : null}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
