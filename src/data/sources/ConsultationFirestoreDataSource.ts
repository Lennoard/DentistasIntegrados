import ConsultationMapper from "../mappers/consultation/ConsultationMapper";
import Consultation from "../../domain/entities/consultation/Consultation";
import { ConsultationStatus } from "../../domain/ConsultationStatus";
import { Auth } from "@firebase/auth";
import {
  deleteDoc,
  Firestore,
  QueryDocumentSnapshot,
  setDoc,
  UpdateData,
} from "@firebase/firestore";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import ConsultationDTO from "../models/consultation/ConsultationDTO";
import IFirestoreDataSource from "./IFirestoreDataSource";
import FirestoreConverter from "./FirestoreConverter";

interface ConsultationDataSource {
  addConsultation: (consultation: Consultation) => Promise<void>;
  getConsultation: (id: string) => Promise<Consultation | null>;
  getConsultations: (
    patientId: string | null,
    status: ConsultationStatus
  ) => Promise<Consultation[]>;
}

export default class ConsultationFirestoreDataSource
  implements IFirestoreDataSource<ConsultationDTO>, ConsultationDataSource
{
  private auth: Auth;
  private firestore: Firestore;
  private consultationMapper: ConsultationMapper;

  constructor(auth: Auth, firestore: Firestore, mapper: ConsultationMapper) {
    this.auth = auth;
    this.firestore = firestore;
    this.consultationMapper = mapper;
  }

  async addConsultation(consultation: Consultation): Promise<void> {
    const docRef = this.getDocRef(consultation.id);
    return await setDoc(docRef, this.consultationMapper.unmap(consultation));
  }

  async getConsultation(id: string): Promise<Consultation | null> {
    const docRef = this.getDocRef(id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    const dto: ConsultationDTO = { ...snapshot.data(), id: id };
    return this.consultationMapper.map(dto);
  }

  async getConsultations(
    patientId: string | null,
    status: ConsultationStatus
  ): Promise<Consultation[]> {
    const consultations = new Array<Consultation>();
    const statusFilter = where("status", "==", status);
    let q = query(this.getCollectionRef(), statusFilter);

    if (patientId != null) {
      q = query(
        this.getCollectionRef(),
        where("patientId", "==", patientId),
        statusFilter
      );
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      consultations.push(
        this.consultationMapper.map({ ...doc.data(), id: doc.id })
      );
    });

    return consultations;
  }

  getUid(): string {
    return this.auth.currentUser!!.uid;
  }

  getConverter(): FirestoreConverter<ConsultationDTO> {
    return {
      toFirestore: (data: ConsultationDTO) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as ConsultationDTO,
    };
  }

  getDocRef(docId: string) {
    return doc(
      this.firestore,
      this.COLLECTION_CONSULTATIONS,
      docId
    ).withConverter(this.getConverter());
  }

  getCollectionRef() {
    return collection(
      this.firestore,
      this.COLLECTION_CONSULTATIONS
    ).withConverter(this.getConverter());
  }

  private COLLECTION_CONSULTATIONS = `users/${this.getUid()}/consultations`;
}
