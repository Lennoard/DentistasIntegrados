import {Container} from "inversify";
import AddConsultationUseCase, {AddConsultationUseCaseImpl} from "../usecases/consultation/AddConsultationUseCase";
import DomainTypes from "./DomainTypes";
import GetConsultationsUseCase, {GetConsultationsUseCaseImpl} from "../usecases/consultation/GetConsultationsUseCase";
import GetConsultationUseCase, {GetConsultationUseCaseImpl} from "../usecases/consultation/GetConsultationUseCase";
import AddPatientUseCase, {AddPatientUseCaseImpl} from "../usecases/patient/AddPatientUseCase";
import GetPatientsUseCase, {GetPatientsUseCaseImpl} from "../usecases/patient/GetPatientsUseCase";
import GetPatientUseCase, {GetPatientUseCaseImpl} from "../usecases/patient/GetPatientUseCase";

const domainContainer = new Container();

// Use cases
domainContainer.bind<AddConsultationUseCase>(DomainTypes.AddConsultationUseCase).to(AddConsultationUseCaseImpl);
domainContainer.bind<GetConsultationsUseCase>(DomainTypes.GetConsultationsUseCase).to(GetConsultationsUseCaseImpl);
domainContainer.bind<GetConsultationUseCase>(DomainTypes.GetConsultationUseCase).to(GetConsultationUseCaseImpl);
domainContainer.bind<AddPatientUseCase>(DomainTypes.AddPatientUseCase).to(AddPatientUseCaseImpl);
domainContainer.bind<GetPatientsUseCase>(DomainTypes.GetPatientsUseCase).to(GetPatientsUseCaseImpl);
domainContainer.bind<GetPatientUseCase>(DomainTypes.GetPatientUseCase).to(GetPatientUseCaseImpl);

export default domainContainer;
