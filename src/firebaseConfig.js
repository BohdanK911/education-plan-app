import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_CLIENT_ID, REACT_APP_FIREBASE_AUTH_DOMAIN } from 'app/config';

export const firebaseUiConfig = {
  callbacks: {
    // Called when the user has been successfully signed in.
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult.user) {
        // handleSignedInUser(authResult.user);
      }

      // if (authResult.additionalUserInfo) {
      //   document.getElementById('is-new-user').textContent = authResult.additionalUserInfo.isNewUser
      //     ? 'New User'
      //     : 'Existing User';
      // }

      // Do not redirect.
      return false;
    }
  },
  // Opens IDP Providers sign-in flow in a popup.
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId: REACT_APP_FIREBASE_CLIENT_ID
    }
  ],
  // Terms of service url.
  tosUrl: 'https://www.google.com',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.google.com',
  credentialHelper:
    REACT_APP_FIREBASE_CLIENT_ID && REACT_APP_FIREBASE_CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID'
      ? firebaseui.auth.CredentialHelper.GOOGLE_YOLO
      : firebaseui.auth.CredentialHelper.NONE
};

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'education-plan-app',
  storageBucket: 'education-plan-app.appspot.com',
  messagingSenderId: '876855526565',
  appId: '1:876855526565:web:7fbe854c640babedd7f94c',
  measurementId: 'G-NJ5N8J9CB1'
};

firebase.initializeApp(firebaseConfig);
