import * as firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAdv3aRVKWf36ezvtYGfK1NRbReU3zio2U",
  authDomain: "expo-dating-app-cd762.firebaseapp.com",
  databaseURL: "https://expo-dating-app-cd762.firebaseio.com",
  projectId: "expo-dating-app-cd762",
  storageBucket: "expo-dating-app-cd762.appspot.com",
  messagingSenderId: "670282659913"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
