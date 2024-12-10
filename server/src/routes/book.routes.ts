import { Router } from 'express';
import {
  createBook,
  getBook,
  updateBook,
  deleteBook,
  getSingleBook,
} from '../controller/book.controller';

const bookRouter = Router({
  mergeParams: true,
});

bookRouter.get('/', getBook);
bookRouter.post('/', createBook);
bookRouter.get('/:userId', getSingleBook);
bookRouter.put('/:userId', updateBook);
bookRouter.delete('/:userId', deleteBook);

export default bookRouter;
