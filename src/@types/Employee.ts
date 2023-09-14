import { CustomData } from "./CustomData";
import { Lesson } from "./Lesson";
import { School } from "./School";

export interface ZoomInfo {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Role {
  id: string;
  permissions: Array<{
    id: string;
    slug: string;
    group: string;
  }>;
  slug: string;
  description: string;
  school: School;
}

export interface LoginResponse {
  id: string;
  name: string;
  zoomEmail: string;
  zoomIndex: number;
  zoomPassword: string;
  salary: number;
  zoom: ZoomInfo;
  lessons: Lesson[];
  coordinate: string[];
  image: string;
  phone: string;
  address: string;
  type: string;
  username: string;
  password: string;
  email: string;
  school: School;
  role: Role;
  roles: Role[];
  classes: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  subjects: Array<{
    id: string;
    name: string;
    comment: string;
  }>;
  branches: Array<{
    id: string;
    name: string;
    comment: string;
    students: number;
  }>;
  permissionsChat: boolean;
  permissionsHomeWork: boolean;
  permissionsMark: boolean;
  permissionsPost: boolean;
  permissionsAccount: boolean;
  extra: CustomData;
  token: string;
}
