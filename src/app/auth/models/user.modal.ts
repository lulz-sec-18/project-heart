// import {patient} from './patient'

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  hospital_name?: string;
  hospital_address?:string;
  Specialization?:string;
}
