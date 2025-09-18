import UserRole from "./UserRole";
export default interface Role {
  id?: string;
  name: string;
  description?: string;
  userRoles: UserRole | [];
}
