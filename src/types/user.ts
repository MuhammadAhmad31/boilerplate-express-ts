export interface User {
  id: number;
  username: string;
  password: string;
  roleId: string;
}

export interface UserWithRole extends User {
  role: {
    id: number;
    name: string;
  };
}
