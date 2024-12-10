import { Prisma, PrismaClient } from '@prisma/client';
import { Database as db } from '../config/database.confitg';

export class UserService {
  static async getUsers() {
    try {
      const users = await db.client.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getOneUser(userId: string) {
    try {
      const users = await db.client.user.findUnique({
        where: {
          id: userId,
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(data: Prisma.UserCreateInput) {
    try {
      const newUser = await db.client.user.create({
        data,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId: string, data: Prisma.UserUpdateInput) {
    try {
      const updatedUser = await db.client.user.update({
        where: {
          id: userId,
        },
        data,
      });

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId: string) {
    try {
      const deletedUser = await db.client.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
