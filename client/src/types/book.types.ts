import { TUser } from './user.types';

export type TBook = {
  id: string;
  title: string;
  description: string;
  author: TUser;
};
