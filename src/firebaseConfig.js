import firebase from 'firebase';
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
    // TODO(developer): Remove the providers you don't need for your app.
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable ID token credentials for this provider.
      clientId: REACT_APP_FIREBASE_CLIENT_ID
    },
    // {
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   // Whether the display name should be displayed in Sign Up page.
    //   requireDisplayName: true,
    //   signInMethod: getEmailSignInMethod(),
    //   disableSignUp: {
    //     status: getDisableSignUpStatus()
    //   }
    // },
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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
