import { useState, useEffect } from 'react';
import firebase from 'firebase';

const useSignedInUser = () => {
  const [isSignedInUser, setIsSignedInUser] = useState(null);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      user => setIsSignedInUser(user),
      err => console.error(new Error(err))
    );

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return isSignedInUser;
};

export default useSignedInUser;
