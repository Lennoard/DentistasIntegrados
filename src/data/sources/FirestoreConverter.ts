import { QueryDocumentSnapshot } from "@firebase/firestore";

export default interface FirestoreConverter<T> {
  toFirestore: (data: T) => T;
  fromFirestore: (snap: QueryDocumentSnapshot) => T;
}
