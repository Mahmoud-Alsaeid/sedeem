import { Respones } from "./Response";
export interface Class {
  id: string;
  name: string;
  branches: Array<{
    id: string;
    name: string;
  }>;
}

export type ClassResponse = Respones<Class>;
