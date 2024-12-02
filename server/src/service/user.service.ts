import { Prisma, PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export class UserService {
  static async getUsers() {
    try {
      const users = await client.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getOneUser(userId: string) {
    try {
      const users = await client.user.findUnique({
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
      const newUser = await client.user.create({
        data,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId: string, data: Prisma.UserUpdateInput) {
    try {
      const updatedUser = await client.user.update({
        where: {
          id: userId,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId: string) {
    try {
      const deletedUser = await client.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
