import { PrismaClient } from '@prisma/client';

export class Database {
  protected static dbClient: PrismaClient;

  public static async connect() {
    try {
      const client = new PrismaClient();
      await client.$connect();
      this.dbClient = client;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static query(query: string) {
    return this.dbClient.$queryRawUnsafe(query);
  }

  public static get client() {
    return this.dbClient;
  }
}
