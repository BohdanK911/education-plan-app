import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const Modal = ({ title, isOpen, onClose: handleClose, onSave }) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby={'modal-dialog-title'}
    aria-describedby={'modal-dialog-description'}
  >
    <DialogTitle id={'modal-dialog-title'}>{title}</DialogTitle>
    <DialogActions>
      <Button onClick={onSave} color={'primary'}>
        Save
      </Button>
      <Button onClick={handleClose} color={'secondary'}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Modal;
