import { Feedback } from "@/types/feedback";
import { DocumentType } from "@/types/vaccines";

export const DOCUMENT_TYPE: DocumentType[] = [
  { name: "CPF", value: "CPF" },
  { name: "Passaporte", value: "PASSPORT" },
];

export const DEFAULT_FEEDBACK = {
  show: false,
  isError: false,
  type: undefined,
  title: "",
  message: "",
  strongMessage: "",
} as Feedback;
