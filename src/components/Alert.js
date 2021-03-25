import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const Alert = ({ title, buttonText = 'Ok', isOpen, onClose: handleClose }) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby={'alert-dialog-title'}
    aria-describedby={'alert-dialog-description'}
  >
    <DialogTitle id={'alert-dialog-title'}>{title}</DialogTitle>

    <DialogActions>
      <Button onClick={handleClose} color={'primary'} autoFocus>
        {buttonText}
      </Button>
    </DialogActions>
  </Dialog>
);

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default Alert;
