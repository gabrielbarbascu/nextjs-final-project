import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  service: string;
  isAdmin: boolean;
  profileImage: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(80) NOT NULL UNIQUE,
    email VARCHAR(50),
    password_hash VARCHAR(80) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(1),
    phone_number VARCHAR(50),
    service VARCHAR(50),
    is_admin BOOLEAN,
    profile_image VARCHAR(120),
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
