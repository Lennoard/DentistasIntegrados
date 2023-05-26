import type { Auth } from "@firebase/auth";
import { Firestore, QueryDocumentSnapshot, setDoc } from "@firebase/firestore";
import { collection, doc, getDoc, getDocs, query, updateDoc, where, } from "firebase/firestore";
import { inject, injectable } from "inversify";
import Patient from "../../../domain/entities/Patient";
import DataTypes from "../../di/DataTypes";
import PatientMapper from "../../mappers/PatientMapper";
import PatientDTO from "../../models/PatientDTO";
import FirestoreConverter from "../FirestoreConverter";
import IFirestoreDataSource from "../IFirestoreDataSource";
import PatientDataSource from "./PatientDataSource";

@injectable()
export default class PatientFirestoreDataSource
  implements IFirestoreDataSource<PatientDTO>, PatientDataSource
{
  constructor(
    @inject(DataTypes.Auth) private auth: Auth,
    @inject(DataTypes.Firestore) private firestore: Firestore,
    @inject(DataTypes.PatientMapper) private patientMapper: PatientMapper
  ) {}

  async addPatient(patient: Patient): Promise<void> {
    const docRef = this.getDocRef(patient.id);
    const { id: _, ...dto } = this.patientMapper.unmap(patient);
    return await setDoc(docRef, dto);
  }

  async updatePatient(patient: Patient): Promise<void> {
    const docRef = this.getDocRef(patient.id);
    const { id: _, ...dto } = this.patientMapper.unmap(patient);
    return await updateDoc(docRef, dto);
  }

  async getPatient(id: string): Promise<Patient | null> {
    const docRef = this.getDocRef(id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    const dto: PatientDTO = { ...snapshot.data(), id: id };
    return this.patientMapper.map(dto);
  }

  async getPatients(active: boolean): Promise<Patient[]> {
    const patients = new Array<Patient>();
    const statusFilter = where("active", "==", active);
    let q = query(this.getCollectionRef(), statusFilter);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      patients.push(this.patientMapper.map({ ...doc.data(), id: doc.id }));
    });

    return patients;
  }

  getUid(): string {
    return this.auth.currentUser?.uid || "";
  }

  getConverter(): FirestoreConverter<PatientDTO> {
    return {
      toFirestore: (data: PatientDTO) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as PatientDTO,
    };
  }

  getDocRef(docId: string) {
    return doc(this.firestore, this.COLLECTION_PATIENTS, docId).withConverter(
      this.getConverter()
    );
  }

  getCollectionRef() {
    return collection(this.firestore, this.COLLECTION_PATIENTS).withConverter(
      this.getConverter()
    );
  }

  private COLLECTION_PATIENTS = `users`;
}
