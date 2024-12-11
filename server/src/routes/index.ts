import { Router } from 'express';
import userRouter from './user.routes';
import bookRouter from './book.routes';

const apiRouter = Router({
  mergeParams: true,
});

apiRouter.use('/users', userRouter);
apiRouter.use('/books', bookRouter);

export default apiRouter;
