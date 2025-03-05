export class CreateAuthDto {}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
};
