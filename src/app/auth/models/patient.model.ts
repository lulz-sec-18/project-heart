import { Medicine } from "./medicines.model";

export interface Patient {
  doctor_uid: string;
  admission_time: Date;
  name: string;
  id: number;
  disease?: string;
  condition?: boolean;
  prescribedDose?: Medicine[];
  attributes?:number[];
}
