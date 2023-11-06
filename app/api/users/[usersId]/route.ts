import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from '../../../../database/users';
import { User } from '../../../../migrations/00000-createTableUsers';
import { Error } from '../route';

type UserResponseBodyGet = { user: User } | Error;
type UserResponseBodyPut = { user: User } | Error;
type UserResponseBodyDelete = { user: User } | Error;

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  service: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyGet>> {
  console.log(params);
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const user = await getUserById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
  const result = userSchema.safeParse(body);
  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  // query the database to update the animal
  const user = await updateUserById(
    userId,
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    result.data.phoneNumber,
    result.data.service,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Error updating the user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyDelete>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const user = await deleteUserById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'Error deleting the user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}
