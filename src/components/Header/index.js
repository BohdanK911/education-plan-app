import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { AssignmentRounded } from '@material-ui/icons';
import useSignedInUser from 'hooks/useSignedInUser';
import useWindowWidth from 'hooks/useWindowWidth';
import ProfileTile from 'components/ProfileTile';

const Header = ({ title }) => {
  const signedInUser = useSignedInUser();
  const windowWidth = useWindowWidth();

  return (
    <AppBar position={'fixed'}>
      <Toolbar>
        <AssignmentRounded />
        {windowWidth > 560 ? <Typography variant={'h6'}>{title}</Typography> : null}
        {signedInUser ? <ProfileTile photo={signedInUser.photoURL}>{signedInUser.displayName}</ProfileTile> : null}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
