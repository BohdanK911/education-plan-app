import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const Confirm = ({
  title,
  cancelButtonText = 'Cancel',
  submitButtonText = 'Submit',
  isOpen,
  onClose: handleClose,
  onSubmit: handleSubmit
}) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby={'confirm-dialog-title'}
    aria-describedby={'confirm-dialog-description'}
  >
    <DialogTitle id={'confirm-dialog-title'}>{title}</DialogTitle>

    <DialogActions>
      <Button onClick={handleClose} color={'primary'} autoFocus>
        Close
      </Button>

      <Button onClick={handleSubmit} color={'primary'}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Confirm;
