export interface School {
  id: string;
  name: string;
  code: string;
  mapID: string;
  address: string;
  website: string;
  email: string;
  phone1: string;
  phone2: string;
  comment: string;
  logo: string;
  image1: string;
  image2: string;
  studentLimit: number;
  ratingOptions: {
    option1: {
      name: string;
      options: string[];
    };
    option2: {
      name: string;
      options: string[];
    };
    option3: {
      name: string;
      options: string[];
    };
    option4: {
      name: string;
      options: string[];
    };
  };
}
