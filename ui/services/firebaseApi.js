import * as firebase from "firebase";
import "firebase/firestore";
import AwesomeDebouncePromise from "awesome-debounce-promise";

const db = firebase.firestore();

const firebaseApi = {
  updateGenderApiCall: userId =>
    db
      .collection("users")
      .doc(userId)
      .update({
        "settings.genderShownSelection": this.state.genderShownSelection
      })
      .then(function() {
        console.log("Gender shown successfully updated!");
      }),
  updateGenderApiCallDebounced: AwesomeDebouncePromise(
    updateGenderApiCall,
    1000
  )
};
