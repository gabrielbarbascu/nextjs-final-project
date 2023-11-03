import 'server-only';
import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    phoneNumber: string,
    isAdmin: boolean,
    profileImage: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
      ( username, email, password_hash, first_name, last_name, date_of_birth, gender, phone_number,  is_admin, profile_image)
      VALUES
      ( ${username} ,${email}, ${passwordHash}, ${firstName}, ${lastName}, ${dateOfBirth}, ${gender}, ${phoneNumber} ,${isAdmin}, ${profileImage} )
      RETURNING
      id, username, email, password_hash, first_name, last_name, date_of_birth, gender, phone_number, is_admin, profile_image

    `;
    return user;
  },
);

export const getUsers = cache(async () => {
  // return animals;
  const users = await sql<User[]>`
    SELECT * FROM users
  `;
  return users;
});

{
  /*export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (username, password_hash)
      VALUES
        (${username.toLowerCase()}, ${passwordHash})
      RETURNING
        id,
        username
    `;
    return user;
  },
); */
}

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username,date_of_birth,gender,first_name,last_name,profile_image,email,phone_number
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
   SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUsersWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return animals;
    const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
    Limit ${limit}
    OFFSET ${offset}
  `;
    return users;
  },
);

export const getUserById = cache(async (id: number) => {
  // Postgres always returns an array
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;

  return user;
});

export const updateUserById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    service: string,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE
        users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        phone_number = ${phoneNumber},
        service = ${service || null}

      WHERE id = ${id}
      RETURNING *
    `;
    return user;
  },
);
