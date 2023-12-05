// export type Vaccine = {
//   id: number;
//   dose: string;
//   description: string;
//   producer: string; // manufacturer
//   vaccinationDate: string;
//   name: string;

//   /**
//    * nome popular
//    * nome completo
//    * idade? (quantos anos tem que tomar a vacina)
//    * ano? (qual ano tem que tomar)
//    * required: boolean
//    */
// };

// export type Vaccine = {
//   id: number;
//   dose: string;
//   description: string;
//   manufacturer: string;
//   vaccinationDate: string;
//   completedName?: string;
//   popularName: string;
//   age?: number;
//   year?: number;
//   required?: boolean;
// };

export type Vaccine = {
  id: string;
  popularName: string;
  fullName: string;
  manufacturer: string;
  age: number;
  year: number;
  description: string;
  required: boolean;
};

export type VaccineStatus = "pending" | "completed" | "information"; // não obrigatório (amarelo)

/**
 * OBJETO USER - cadastro
 * firstName
 * lastName
 * documentType (select - CPF ou pasport) -
 * document
 * password
 * dateOfBirth
 * phone (cod.país + DDD + numero)
 * nickName
 */

/**
 * OBJETO USER - login
 * tipo documento (select - CPF ou Passaporte)
 * documento
 * senha
 */

/**
 * REGISTRAR VACINA
 * id da vacina
 * data da vacinação
 * id do usuário
 */

/**
 * MEU PERFIL
 * o nome pode ser editável
 */

export type DocumentType = {
  name: string;
  value: string;
};