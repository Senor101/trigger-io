import { Router } from 'express';
import userRouter from './user.routes';

const apiRouter = Router({
  mergeParams: true,
});

apiRouter.use('/users', userRouter);
apiRouter.use('/books', userRouter);

export default apiRouter;
