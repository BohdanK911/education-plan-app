import { useEffect, useState } from 'react';
import { Card, ThemeProvider, Typography, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseUiConfig } from 'firebaseConfig';
import useSignedInState from 'hooks/useSignedInState';
import Header from 'components/Header';
import Preloader from 'components/Preloader';
import Calendar from 'components/Calendar';
import theme from './theme';
import style from './App.module.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isSignedIn = useSignedInState();
  const isShowPreloader = isLoading || typeof isSignedIn !== 'boolean';

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <ThemeProvider theme={theme}>
        <div className={style.app}>
          <Header title={"Student's education plan app"} />
          <main className={isShowPreloader ? style.mainPreloader : null}>
            {isShowPreloader ? (
              <Preloader />
            ) : (
              <>
                {isSignedIn ? (
                  <Calendar />
                ) : (
                  <Card elevation={0}>
                    <Grid container direction={'column'}>
                      <Typography variant={'h6'} style={{ marginTop: 20 }}>
                        You must sign in first
                      </Typography>
                      <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
                    </Grid>
                  </Card>
                )}
              </>
            )}
          </main>
        </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
