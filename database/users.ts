import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type UserNote = {
  noteId: number;
  textContent: string;
  username: string;
};

export const createUser = cache(
  async (
    id: number,
    username: string,
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    phoneNumber: string,
    service: string,
    isAdmin: boolean,
    profileImage: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
      (id, username, email, password_hash, first_name, last_name,gender, phone_number, service, is_admin, profile_image)
      Values
      (${id}, $(username) ${passwordHash}, $(email) $(firstName), $(lastName), $(dateOfBirth), $(gender), $(phoneNumber), $(service), $(isAdmin), $(profileImage))
      RETURNING
      id, username, email, password_hash, first_name, last_name,gender, phone_number, service, is_admin, profile_image

    `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
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

export const getUserNoteBySessionToken = cache(async (token: string) => {
  const notes = await sql<UserNote[]>`
   SELECT
      notes.id AS note_id,
      notes.text_content AS text_content,
      users.username AS username
    FROM
      notes
    INNER JOIN
      users ON notes.user_id = users.id
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return notes;
});
