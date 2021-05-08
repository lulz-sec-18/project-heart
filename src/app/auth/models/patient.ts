import { medicines } from "./medicines";

export interface patient {
  doctor_uid: string;
  name: string;
  id: number;
  disease: string;
  condition: boolean;
  prescribedDose: medicines[];
}