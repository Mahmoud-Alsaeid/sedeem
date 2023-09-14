import { Respones } from "./Response";

export interface Student {
  id: string;
  image: string;
  name: string;
  installment: string;
  phone: string;
  parentPassword: string;
  parentUsername: string;
  password: string;
  username: string;
  joinDate: string;
}

export type StudentsResponse = Respones<Student>;
