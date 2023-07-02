import FirestoreConverter from "./FirestoreConverter";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import CollectionReference = firebase.firestore.CollectionReference;

export default interface IFirestoreDataSource<DTO> {
  getUid(): string;
  getConverter(): FirestoreConverter<DTO>;
  getDocRef(docId: string): DocumentReference<DTO> | any;
  getCollectionRef(): CollectionReference<DTO> | any;
}
