import { useState, useEffect } from 'react';
import firebase from 'firebase';

const useSignedInState = () => {
  const [isSignedInState, setIsSignedInState] = useState(null);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      user => setIsSignedInState(!!user),
      err => console.error(new Error(err))
    );

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return isSignedInState;
};

export default useSignedInState;
