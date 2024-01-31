export interface ClientData {
  uid: string;
  name: string;
  rg: string;
  cpf: string;
  address: string;
  cep: string;
  city: string;
  state: string;
  complement: string;
  contactEmengency: string;
  localPaymentNote: string;
  maritalState: {
    name: string;
  };
  nationality: string;
  phone: string;
  profession: string;
  dateFinalScheduleContract: string;
  dueDateNote: string;
  valueParcelNote: string;
  valueScheduleContract: string;
}