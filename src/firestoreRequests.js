import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const db = firebase.firestore();

export const getUserStore = async userId => {
  try {
    const req = await db.collection('education_plans').doc(userId).get();

    console.info(req.data());
  } catch (err) {
    console.error(new Error(err));
  }
};
