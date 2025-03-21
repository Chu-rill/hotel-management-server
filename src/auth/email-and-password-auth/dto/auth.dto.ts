import { Role } from '@prisma/client';
export class CreateAuthDto {}

export type SignUpDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
  hotelId?: number;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type OTPDto = {
  email: string;
  OTP: string;
};
export type ResendDto = {
  email: string;
};
