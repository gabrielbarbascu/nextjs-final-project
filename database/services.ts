import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Service } from '../migrations/00001-createTableServices';

export const getServices = cache(async () => {
  const services = await sql<Service[]>`
    SELECT
      *
    FROM
      services
  `;
  return services;
});

export const createUserService = cache(
  async (userId: number, serviceId: number) => {
    const [service] = await sql<Service[]>`
      INSERT INTO user_services
      ( user_id, service_id)
      Values
      ( ${userId}, ${serviceId} )
      RETURNING
      user_id, service_id

    `;
    return service;
  },
);
export const getUserServices = cache(async () => {
  const services = await sql<Service[]>`
    SELECT
      *
    FROM
      user_services
  `;
  return services;
});
