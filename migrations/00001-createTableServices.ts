import { Sql } from 'postgres';

export type Service = {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE services (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) ,
    description VARCHAR(200),
    price VARCHAR(15),
    duration VARCHAR(30)

    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE services
  `;
}
