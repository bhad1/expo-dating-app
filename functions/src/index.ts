import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp();

export const addEmployerRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        isEmployer: data.isEmployer
      });
    })
    .then(() => {
      message: "Success! ${data.email} has been made an admin";
    })
    .catch(err => {
      return err;
    });
});
