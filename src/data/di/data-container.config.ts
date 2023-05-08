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

// Services
dataContainer.bind<Auth>(DataTypes.Auth).toConstantValue(getAuth());
dataContainer.bind<Firestore>(DataTypes.Firestore).toConstantValue(getFirestore());

export default dataContainer;