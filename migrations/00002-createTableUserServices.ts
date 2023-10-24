import { Sql } from 'postgres';

export type UserService = {
  userId: number;
  serviceId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE user_services (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

    user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    service_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE


    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE user_services
  `;
}
