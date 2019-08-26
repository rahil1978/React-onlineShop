import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBo-YeC4eq-_Qgljzv9dr85mJ8IN5DxsbQ",
    authDomain: "crwn-db-31381.firebaseapp.com",
    databaseURL: "https://crwn-db-31381.firebaseio.com",
    projectId: "crwn-db-31381",
    storageBucket: "",
    messagingSenderId: "710374212555",
    appId: "1:710374212555:web:4224fb3cb4731775"
  };

  export const createUserProfileDocument = async (userAuth, additionData) => {
    if(!userAuth) return; 
    const userRef = firestore.doc(`users/${userAuth.uid}`); 
    const snapShot = await userRef.get(); 
    
    if(!snapShot.exists){

      const {displayName,email} = userAuth; 
      const createdAt = new Date();      

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionData
        })
      } catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef; 
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();    


  const provider = new firebase.auth.GoogleAuthProvider(); 
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;