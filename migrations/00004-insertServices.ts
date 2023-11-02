import { Sql } from 'postgres';

const services = [
  {
    id: 1,
    name: 'Fitness',
    description: 'Description of Service 1',
    duration: '1 Month',
    price: 1,
  },
  {
    id: 2,
    name: 'Fitness + Nutrition',
    description: 'Description of Service 2',
    duration: '1 Month',
    price: 2,
  },
  {
    id: 3,
    name: 'PREMIUM',
    description: 'Description of Service 3',
    duration: '1 Month',
    price: 3,
  },
];

export async function up(sql: Sql) {
  for (const service of services) {
    await sql`
      INSERT INTO
        services (
          name,
          description,
          duration,
          price
        )
      VALUES
        (
          ${service.name},
          ${service.description},
          ${service.duration},
          ${service.price}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const service of services) {
    await sql`
      DELETE FROM services
      WHERE
        id = ${service.id}
    `;
  }
}
