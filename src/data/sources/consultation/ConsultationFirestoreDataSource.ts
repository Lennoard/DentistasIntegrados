import ConsultationMapper from "../../mappers/consultation/ConsultationMapper";
import Consultation from "../../../domain/entities/consultation/Consultation";
import {ConsultationStatus} from "../../../domain/ConsultationStatus";
import type {Auth} from "@firebase/auth";
import {Firestore, QueryDocumentSnapshot} from "@firebase/firestore";
import {collection, doc, addDoc, getDoc, getDocs, query, where,} from "firebase/firestore";
import ConsultationDTO from "../../models/consultation/ConsultationDTO";
import IFirestoreDataSource from "../IFirestoreDataSource";
import FirestoreConverter from "../FirestoreConverter";
import ConsultationDataSource from "./ConsultationDataSource";
import {inject, injectable} from "inversify";
import DataTypes from "../../di/DataTypes";
import Question from "../../../domain/entities/consultation/Question";
import QuestionDTO from "../../models/consultation/QuestionDTO";
import QuestionMapper from "../../mappers/consultation/QuestionMapper";

@injectable()
export default class ConsultationFirestoreDataSource
  implements IFirestoreDataSource<ConsultationDTO>, ConsultationDataSource {

  constructor(
    @inject(DataTypes.Auth) private auth: Auth,
    @inject(DataTypes.Firestore) private firestore: Firestore,
    @inject(DataTypes.ConsultationMapper) private consultationMapper: ConsultationMapper,
    @inject(DataTypes.QuestionMapper) private questionMapper: QuestionMapper
  ) {}

  async getQuestions(): Promise<Question[]> {
    const questions = new Array<Question>();
    let q = query(this.getQuestionCollectionRef());

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      questions.push(
        this.questionMapper.map({ ...doc.data(), id: doc.id })
      );
    });

    return questions;
  }

  async addConsultation(consultation: Consultation): Promise<void> {
    const { id: _, ...dto } = this.consultationMapper.unmap(consultation);  
    await addDoc(this.getCollectionRef(), dto)
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
    const statusFilter = where("status", "==", status.valueOf());
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
    return this.auth.currentUser?.uid || "";
  }

  getConverter(): FirestoreConverter<ConsultationDTO> {
    return {
      toFirestore: (data: ConsultationDTO) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as ConsultationDTO,
    };
  }

  getQuestionConverter(): FirestoreConverter<QuestionDTO> {
    return {
      toFirestore: (data: QuestionDTO) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as QuestionDTO,
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

  getQuestionCollectionRef() {
    return collection(
      this.firestore,
      this.COLLECTION_QUESTIONS
    ).withConverter(this.getQuestionConverter());
  }

  private COLLECTION_CONSULTATIONS = `consultations`;
  private COLLECTION_QUESTIONS = `anamnesis`;
}
