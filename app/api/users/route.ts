import { NextRequest, NextResponse } from 'next/server';
import { getUsersWithLimitAndOffset } from '../../../database/users';
import { User } from '../../../migrations/00000-createTableUsers';

export type Error = {
  error: string;
};

type UsersResponseBodyGet =
  | {
      users: User[];
    }
  | Error;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the users only if a valid session token is passed
  const users = await getUsersWithLimitAndOffset(limit, offset);

  return NextResponse.json({
    users: users,
  });
}
