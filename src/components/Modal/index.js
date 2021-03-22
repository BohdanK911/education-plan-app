import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useEffect } from 'react';

const Modal = ({
  title,
  isOpen,
  onCancel: handleCancel,
  onSubmit: handleSubmit,
  buttonSubmitText = 'Submit',
  buttonCancelText = 'Cancel'
}) => {
  // useEffect(() => {
  //   if (document.keyCode === 13) handleSubmit();
  // }, []);
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby={'modal-dialog-title'}
      aria-describedby={'modal-dialog-description'}
      onKeyDown={({ nativeEvent: { key } }) => {
        if (key === 'Enter') handleSubmit();
      }}
    >
      <DialogTitle id={'modal-dialog-title'}>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleCancel} color={'primary'}>
          {buttonCancelText}
        </Button>
        <Button onClick={handleSubmit} color={'secondary'}>
          {buttonSubmitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonSubmitText: PropTypes.string,
  buttonCancelText: PropTypes.string
};

export default Modal;
