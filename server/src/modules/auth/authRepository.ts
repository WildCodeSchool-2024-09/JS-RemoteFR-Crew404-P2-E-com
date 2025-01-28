import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  password: string;
  avatar: string;
};

class AuthRepository {
  // The C of CRUD - Create operation
  // (pour l'authentification, c'est le register)

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (email, password, avatar) values (?, ?, ?)",
      [user.email, user.password, user.avatar],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(email: string) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
  }

  async resetPassword({
    id,
    hasedToken,
    ttl,
  }: {
    id: number;
    hasedToken: string;
    ttl: Date;
  }) {
    await databaseClient.query<Result>(
      "delete from reset_password where user_id = ?",
      [id],
    );
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into reset_password (user_id, token, expires_at) values (?, ?, ?)",
      [id, hasedToken, ttl],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async verifyToken({ hasedToken, id }: { hasedToken: string; id: number }) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from reset_password where user_id = ? and token = ? and expires_at > NOW()",
      [id, hasedToken],
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async updatePassword({ id, password }: { id: number; password: string }) {
    // Execute the SQL UPDATE query to update an existing item in the "item" table
    await databaseClient.query<Result>(
      "update user set password = ? where id = ?",
      [password, id],
    );
  }
}

export default new AuthRepository();
