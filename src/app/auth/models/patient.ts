import { medicines } from "./medicines";

export interface patient {
  name: string;
  id: number;
  disease: string;
  condition: boolean;
  prescribedDose: medicines[];
}