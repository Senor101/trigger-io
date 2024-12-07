import { TUser } from './user.types';

export type TBook = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description: string;
  author: TUser;
};
