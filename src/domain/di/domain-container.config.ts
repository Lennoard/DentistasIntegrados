import { Container } from "inversify";
import CreateAccountUseCase, { CreateAccountUseCaseImpl } from "../usecases/CreateAccountUseCase";
import AddConsultationUseCase, { AddConsultationUseCaseImpl } from "../usecases/consultation/AddConsultationUseCase";
import GetConsultationUseCase, { GetConsultationUseCaseImpl } from "../usecases/consultation/GetConsultationUseCase";
import GetConsultationsUseCase, { GetConsultationsUseCaseImpl } from "../usecases/consultation/GetConsultationsUseCase";
import AddPatientUseCase, { AddPatientUseCaseImpl } from "../usecases/patient/AddPatientUseCase";
import GetPatientUseCase, { GetPatientUseCaseImpl } from "../usecases/patient/GetPatientUseCase";
import GetPatientsUseCase, { GetPatientsUseCaseImpl } from "../usecases/patient/GetPatientsUseCase";
import UpdatePatientUseCase, { UpdatePatientUseCaseImpl } from "../usecases/patient/UpdatePatientUseCase";
import DomainTypes from "./DomainTypes";

const domainContainer = new Container();

// Use cases
domainContainer.bind<AddConsultationUseCase>(DomainTypes.AddConsultationUseCase).to(AddConsultationUseCaseImpl);
domainContainer.bind<GetConsultationsUseCase>(DomainTypes.GetConsultationsUseCase).to(GetConsultationsUseCaseImpl);
domainContainer.bind<GetConsultationUseCase>(DomainTypes.GetConsultationUseCase).to(GetConsultationUseCaseImpl);
domainContainer.bind<CreateAccountUseCase>(DomainTypes.CreateAccountUseCase).to(CreateAccountUseCaseImpl);
domainContainer.bind<AddPatientUseCase>(DomainTypes.AddPatientUseCase).to(AddPatientUseCaseImpl);
domainContainer.bind<UpdatePatientUseCase>(DomainTypes.UpdatePatientUseCase).to(UpdatePatientUseCaseImpl);
domainContainer.bind<GetPatientsUseCase>(DomainTypes.GetPatientsUseCase).to(GetPatientsUseCaseImpl);
domainContainer.bind<GetPatientUseCase>(DomainTypes.GetPatientUseCase).to(GetPatientUseCaseImpl);

export default domainContainer;
