export type Vaccine = {
  id: number;
  dose: string;
  description: string;
  producer: string;
  vaccinationDate: string;
  name: string;
};

export type VaccineStatus = "pending" | "completed" | "information";