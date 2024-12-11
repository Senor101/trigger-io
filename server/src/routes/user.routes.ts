import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
} from '../controller/user.controller';

const userRouter = Router({
  mergeParams: true,
});

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:userId', getSingleUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);

export default userRouter;
