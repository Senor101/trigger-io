import { Router } from 'express';
import {
  createUser,
  getSingleUser,
  getUsers,
  updateUser,
} from '../controller/user.controller';

const userRouter = Router({
  mergeParams: true,
});

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getSingleUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', updateUser);

export default userRouter;
