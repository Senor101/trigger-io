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
bookRouter.get('/:bookId', getSingleBook);
bookRouter.put('/:bookId', updateBook);
bookRouter.delete('/:bookId', deleteBook);

export default bookRouter;
