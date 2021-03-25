import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { DateTime } from 'luxon';

const EventModal = ({
  title,
  isOpen,
  event,
  onCancel,
  onSubmit,
  buttonSubmitText = 'Submit',
  buttonCancelText = 'Cancel'
}) => {
  const HALF_HOUR = 30;
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const roundedTime = currentDate.set({
    minute: currentDate.minute + (HALF_HOUR - (currentDate.minute % HALF_HOUR)),
    second: 0,
    millisecond: 0
  });
  const maxDate = currentDate.plus({ years: 1 });

  const [state, setState] = useState({
    title: '',
    description: '',
    startDate: currentDate,
    endDate: currentDate,
    startTime: roundedTime,
    endTime: roundedTime.plus({ hours: 1 }),
    isAllDay: false
  });

  const handleChange = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));
  const handleChangeSwitch = ({ target: { name, checked } }) => setState(state => ({ ...state, [name]: checked }));
  const handleChangeDatePicker = (name, value) => setState(state => ({ ...state, [name]: value }));

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(state);

    return onCancel();
  };

  useEffect(() => {
    setCurrentDate(DateTime.now());
  }, [state]);

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby={'modal-dialog-title'}
      aria-describedby={'modal-dialog-description'}
    >
      <Container component={'form'} onSubmit={handleSubmit} disableGutters>
        <DialogTitle id={'modal-dialog-title'}>{title}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                autoFocus
                name={'title'}
                margin={'dense'}
                label={'Event name'}
                autoComplete={'off'}
                type={'text'}
                fullWidth
                variant={'outlined'}
                value={state.title}
                onChange={handleChange}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item sm={12}>
              <Grid container justify={'space-between'} spacing={2}>
                <Grid item sm={6}>
                  <DatePicker
                    openTo={'date'}
                    format={'dd.MM.yyyy'}
                    label={'Event start date'}
                    variant={'inline'}
                    inputVariant={'outlined'}
                    views={['year', 'month', 'date']}
                    name={'startDate'}
                    fullWidth
                    margin={'dense'}
                    minDate={currentDate}
                    maxDate={maxDate}
                    value={state.startDate}
                    onChange={value => handleChangeDatePicker('startDate', value)}
                  />
                </Grid>

                <Grid item sm={6}>
                  <DatePicker
                    openTo={'date'}
                    format={'dd.MM.yyyy'}
                    label={'Event end date'}
                    variant={'inline'}
                    inputVariant={'outlined'}
                    views={['year', 'month', 'date']}
                    name={'startDate'}
                    fullWidth
                    margin={'dense'}
                    minDate={state.startDate}
                    maxDate={maxDate}
                    value={state.endDate}
                    onChange={value => handleChangeDatePicker('endDate', value)}
                  />
                </Grid>
              </Grid>

              <Grid container justify={'space-between'} spacing={2}>
                <Grid item sm={6}>
                  <TimePicker
                    autoOk
                    name={'startTime'}
                    label={'Event start time'}
                    inputVariant={'outlined'}
                    value={state.startTime}
                    onChange={value => handleChangeDatePicker('startTime', value)}
                    fullWidth
                    margin={'dense'}
                    minutesStep={5}
                    ampm={false}
                    minDate={state.startTime}
                    disabled={state.isAllDay}
                  />
                </Grid>

                <Grid item sm={6}>
                  <TimePicker
                    autoOk
                    name={'endTime'}
                    label={'Event end time'}
                    inputVariant={'outlined'}
                    value={state.endTime}
                    onChange={value => handleChangeDatePicker('endTime', value)}
                    fullWidth
                    margin={'dense'}
                    minutesStep={5}
                    disabled={state.isAllDay}
                    ampm={false}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={12}>
              <FormControlLabel
                control={<Switch name={'isAllDay'} checked={state.isAllDay} onChange={handleChangeSwitch} />}
                label={'All day'}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                name={'description'}
                margin={'dense'}
                label={'Event description'}
                autoComplete={'off'}
                placeholder={'Details, reminders, etc.'}
                type={'text'}
                fullWidth
                multiline
                aria-multiline={'true'}
                variant={'outlined'}
                value={state.description}
                onChange={handleChange}
                inputProps={{ maxLength: 2000 }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} color={'primary'}>
            {buttonCancelText}
          </Button>
          <Button type={'submit'} color={'secondary'}>
            {buttonSubmitText}
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
};

EventModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  event: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonSubmitText: PropTypes.string,
  buttonCancelText: PropTypes.string
};

export default EventModal;
