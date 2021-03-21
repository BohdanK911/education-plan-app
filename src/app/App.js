import { useEffect, useState } from 'react';
import { Card, ThemeProvider, Typography, Grid } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseUiConfig } from 'firebaseConfig';
import useSignedInState from 'hooks/useSignedInState';
import Header from 'components/Header';
import Preloader from 'components/Preloader';
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
    <ThemeProvider theme={theme}>
      <div className={style.app}>
        <Header title={"Student's education plan app"} />
        <main className={isShowPreloader ? style.mainPreloader : null}>
          {isShowPreloader ? (
            <Preloader />
          ) : (
            <>
              {isSignedIn ? null : (
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
  );
};

export default App;
