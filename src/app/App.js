import { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { firebaseUiConfig } from 'firebaseConfig';
import useSignedInState from 'hooks/useSignedInState';
import Header from 'components/Header';
import Preloader from 'components/Preloader';
import theme from './theme';
import style from './App.module.css';
import ManagementCalendar from 'components/FullCalendar';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isSignedIn = useSignedInState(); // Local signed-in state.
  const isShowPreloader = isLoading || typeof isSignedIn !== 'boolean';

  useEffect(() => setIsLoading(false), []);

  return (
    <ThemeProvider theme={theme}>
      <div className={isSignedIn ? style.app : style.appCalendar}>
        <Header title={"Student's education plan app"} />
        <main className={isShowPreloader ? style.mainPreloader : null}>
          {/* {isShowPreloader ? (
            <Preloader />
          ) : (
            <>{isSignedIn ? null : */}
          {/* <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} /> */}
          {/* }</> */}
          {/* )} */}
          <ManagementCalendar />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
