import { Router } from 'express';

const bookRouter = Router({
  mergeParams: true,
});

bookRouter.get('/', getUsers);
bookRouter.post('/', createUser);
bookRouter.get('/:userId', getSingleUser);
bookRouter.put('/:userId', updateUser);
bookRouter.delete('/:userId', updateUser);

export default bookRouter;
