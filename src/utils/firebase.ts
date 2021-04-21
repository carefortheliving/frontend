import firebase from "firebase";

const db = firebase.firestore();
db.collection('requests').get().then((docRef) => {
  console.log("Document written with ID: ", docRef.docs);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
