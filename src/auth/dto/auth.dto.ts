export class CreateAuthDto {}

export type SignUpDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
