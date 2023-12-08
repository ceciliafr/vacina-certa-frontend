import { Feedback } from "@/types/feedback";
import { DocumentType } from "@/types/vaccines";

export const DOCUMENT_TYPE: DocumentType[] = [
  { name: "CPF", value: "CPF" },
  { name: "Passaporte", value: "PASSPORT" },
];

export const DEFAULT_FEEDBACK = {
  show: false,
  type: undefined,
  title: "",
  message: "",
  strongMessage: "",
} as Feedback;

export const DEAFULT_FIELD_VALUE = { value: "", error: "" };
export const DEFAULT_DATE_VALUE = { value: null, error: "" };


export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
  EXTERNAL_DEPENDENCY_ERROR: 512,
};

export const HOST = "https://core-dot-summer-catfish-296915.uc.r.appspot.com";

