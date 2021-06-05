import { Medicine } from "./medicines.model";
import {PatientAttributes} from "./patient-attributes.model";


export interface Patient {
  doctor_uid: string;
  admission_time: Date;
  name: string;
  gender:string;
  id: string;
  disease?: string;
  condition?: boolean;
  symptoms:string[];
  prescribedDose?: Medicine[];
  attributes?:PatientAttributes;
}
