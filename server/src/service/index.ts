import { PrismaClient } from '@prisma/client';

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

  static createUser() {
    try {
    } catch (error) {
      throw error;
    }
  }

  static updateUser() {
    try {
    } catch (error) {
      throw error;
    }
  }

  static deleteUser() {
    try {
    } catch (error) {
      throw error;
    }
  }
}
