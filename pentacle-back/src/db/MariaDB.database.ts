import { createConnection, Connection } from 'typeorm';

export class mariaDB {
  public async connection() {
    try {
      const db: Connection = await createConnection();
      console.log('connect mariaDB------------------------');
      return db;
    } catch (e) {
      console.log(`error: ${e}`);
      throw new Error(e);
    }
  }
}
