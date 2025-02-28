import { Prisma } from '@prisma/client';
import { Database as db } from '../config/database.config';

export class BookService {
  static async getBooks() {
    try {
      const books = await db.client.book.findMany({
        include: {
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return books;
    } catch (error) {
      throw error;
    }
  }

  static async getOneBook(bookId: string) {
    try {
      const book = await db.client.book.findUnique({
        where: {
          id: bookId,
        },
      });

      return book;
    } catch (error) {
      throw error;
    }
  }
  static async createBook(data: Prisma.BookCreateInput) {
    try {
      const newBook = await db.client.book.create({
        data,
      });

      return newBook;
    } catch (error) {
      throw error;
    }
  }

  static async updateBook(bookId: string, data: Prisma.BookUpdateInput) {
    try {
      const updatedBook = await db.client.book.update({
        where: {
          id: bookId,
        },
        data,
      });

      return updatedBook;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBook(bookId: string) {
    try {
      const deletedBook = await db.client.book.delete({
        where: {
          id: bookId,
        },
      });

      return deletedBook;
    } catch (error) {
      throw error;
    }
  }
}
