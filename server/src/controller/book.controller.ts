import { Request, Response, NextFunction } from 'express';
import { BookService } from '../service/book.service';

export async function getBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const books = await BookService.getBooks();

  res.status(200).json({
    message: 'Books fetched successfully',
    data: books,
  });
}

export async function getSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.params;
    const book = await BookService.getOneBook(bookId);

    return res.status(200).json({
      message: 'Book fetched successfully.',
      data: book,
    });
  } catch (error) {
    next(error);
  }
}

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const book = await BookService.createBook({
      title: data.title,
      author: { connect: { id: data.author } },
      ISBN: data.ISBN,
      description: data.description,
    });

    return res.status(201).json({
      message: 'Book created successfully.',
      data: book,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.params;
    const book = await BookService.updateBook(bookId, req.body);

    return res.status(200).json({
      message: 'Book updated successfully.',
      data: book,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.params;
    const book = await BookService.deleteBook(bookId);

    return res.status(200).json({
      message: 'Book deleted successfully.',
      data: book,
    });
  } catch (error) {
    next(error);
  }
}
