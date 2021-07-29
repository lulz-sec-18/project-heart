import { Medicine } from "./medicines.model";
import { PatientAttributes } from "./patient-attributes.model";

export interface Patient {
  doctor_uid: string;
  admission_time: number|string;
  name: string;
  gender: string;
  profileImage: string;
  id: string;
  disease?: string;
  condition?: number;
  symptoms?:string;
  prescribedDose?: Medicine[];
  attributes?:PatientAttributes;
  attributesArray?:number[];
}
