import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUserService } from '../../../database/services';
import { Service } from '../../../migrations/00001-createTableServices';

const serviceSchema = z.object({
  userId: z.number(),
  serviceId: z.number(),
});

export type ServiceResponseBodyPost =
  | {
      service: Service;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ServiceResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data
  const result = serviceSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const newUserServices = await createUserService(
    result.data.userId,
    result.data.serviceId,
  );

  if (!newUserServices) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user service' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
    userServices: newUserServices,
  });
}
