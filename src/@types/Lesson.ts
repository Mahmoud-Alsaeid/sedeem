export interface Lesson {
  id: string;
  class: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
    comment: string;
  };
  branch: {
    id: string;
    name: string;
    comment: string;
    students: number;
  };
  lessons: number;
}
