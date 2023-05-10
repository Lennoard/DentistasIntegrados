import "reflect-metadata";
import {Container} from "inversify";
import {Auth, getAuth} from "@firebase/auth";
import {Firestore, getFirestore} from "@firebase/firestore";
import DataTypes from "./DataTypes";
import AddressMapper from "../mappers/AddressMapper";
import PatientMapper from "../mappers/PatientMapper";
import ConsultationMapper from "../mappers/consultation/ConsultationMapper";
import OdontogramMapper from "../mappers/consultation/OdontogramMapper";
import QuestionMapper from "../mappers/consultation/QuestionMapper";
import ToothMapper from "../mappers/consultation/ToothMapper";
import TreatmentMapper from "../mappers/consultation/TreatmentMapper";
import initFirebase from "../../config/firebase";
import ConsultationDataSource from "../sources/consultation/ConsultationDataSource";
import ConsultationFirestoreDataSource from "../sources/consultation/ConsultationFirestoreDataSource";
import PatientDataSource from "../sources/patient/PatientDataSource";
import PatientFirestoreDataSource from "../sources/patient/PatientFirestoreDataSource";
import PatientRepositoryImpl from "../repositories/PatientRepositoryImpl";
import PatientRepository from "../../domain/repositories/PatientRepository";
import ConsultationRepository from "../../domain/repositories/ConsultationRepository";
import ConsultationRepositoryImpl from "../repositories/ConsultationRepositoryImpl";

initFirebase();
const dataContainer = new Container();

// Mappers
dataContainer.bind<AddressMapper>(DataTypes.AddressMapper).to(AddressMapper);
dataContainer.bind<PatientMapper>(DataTypes.PatientMapper).to(PatientMapper);
dataContainer.bind<ConsultationMapper>(DataTypes.ConsultationMapper).to(ConsultationMapper);
dataContainer.bind<OdontogramMapper>(DataTypes.OdontogramMapper).to(OdontogramMapper);
dataContainer.bind<QuestionMapper>(DataTypes.QuestionMapper).to(QuestionMapper);
dataContainer.bind<ToothMapper>(DataTypes.ToothMapper).to(ToothMapper);
dataContainer.bind<TreatmentMapper>(DataTypes.TreatmentMapper).to(TreatmentMapper);

// Data sources
dataContainer.bind<ConsultationDataSource>(DataTypes.ConsultationDataSource).to(ConsultationFirestoreDataSource);
dataContainer.bind<PatientDataSource>(DataTypes.PatientDataSource).to(PatientFirestoreDataSource);

// Repositories
dataContainer.bind<ConsultationRepository>(DataTypes.ConsultationRepository).to(ConsultationRepositoryImpl);
dataContainer.bind<PatientRepository>(DataTypes.PatientRepository).to(PatientRepositoryImpl);

// Services
dataContainer.bind<Auth>(DataTypes.Auth).toConstantValue(getAuth());
dataContainer.bind<Firestore>(DataTypes.Firestore).toConstantValue(getFirestore());

export default dataContainer;
