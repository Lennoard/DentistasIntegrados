const DataTypes = {
  // Mappers
  AddressMapper: Symbol("AddressMapper"),
  PatientMapper: Symbol("PatientMapper"),
  ConsultationMapper: Symbol("ConsultationMapper"),
  OdontogramMapper: Symbol("OdontogramMapper"),
  QuestionMapper: Symbol("QuestionMapper"),
  ToothMapper: Symbol("ToothMapper"),
  TreatmentMapper: Symbol("TreatmentMapper"),

  // Data sources
  ConsultationDataSource: Symbol("ConsultationDataSource"),
  PatientDataSource: Symbol("PatientDataSource"),

  // Repositories
  ConsultationRepository: Symbol("ConsultationRepository"),
  PatientRepository: Symbol("PatientRepository"),

  // Services
  Auth: Symbol("Auth"),
  Firestore: Symbol("Firestore")
};

export default DataTypes;
