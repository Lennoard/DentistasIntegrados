export const enum ConsultationStatus {
  Canceled = -1,
  Requested = 0,
  Confirmed = 1,
  Ongoing = 2,
  Finished = 3,
}

export default function consultationStatusAsString(
  status: ConsultationStatus | undefined
) {
  switch (status) {
    case ConsultationStatus.Canceled:
      return "Cancelada";
    case ConsultationStatus.Requested:
      return "Requisitada";
    case ConsultationStatus.Confirmed:
      return "Confirmada";
    case ConsultationStatus.Ongoing:
      return "Em andamento";
    case ConsultationStatus.Finished:
      return "Finalizada";
    default:
      return "Desconhecido";
  }
}
