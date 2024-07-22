import { Address } from "./Address.Model";
import { Gender } from "./Gender.Model";

export interface Student{
  id:string,
  firstname: string,
  lastname: string,
  dateOfBirth: string,
  email: string,
  mobile: number,
  profileImageUrl: string,
  genderId: string,
  gender: Gender,
  adress: Address
}
