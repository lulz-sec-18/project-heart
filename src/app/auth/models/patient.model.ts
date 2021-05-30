import { medicines } from "./medicines.model";

export interface patient {
  doctor_uid: string;
  admission_time: Date;
  name: string;
  id: number;
  disease?: string;
  condition?: boolean;
  prescribedDose?: medicines[];
  attributes?:number[];
}