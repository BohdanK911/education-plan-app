import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// import useSignedInUser from 'hooks/useSignedInUser';

const Header = ({ title }) => {
  // const signedInUser = useSignedInUser();

  return (
    <AppBar position={'fixed'}>
      <Toolbar>
        <Typography variant={'h6'}>{title ? title : '404'}</Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
