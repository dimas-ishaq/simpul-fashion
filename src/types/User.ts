export type UserTypes = {
  id: string;
  name: string;
  email: string;
  dob: Date | null;
  gender: string | null;
  mobile_number: string | null;
  image: string | null;
  roles: string[];
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
