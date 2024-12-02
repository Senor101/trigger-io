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
userRouter.get('/:userId', getSingleUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', updateUser);

export default userRouter;
