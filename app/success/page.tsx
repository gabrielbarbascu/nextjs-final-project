import './SuccessPage.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { getUserBySessionToken } from '../../database/users';

export default async function SuccessPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <div className="container">
      <div className="success-page">
        <h1>Your journey starts NOW</h1>
        <Link href={`/profile/${user?.id}`}>
          <button className="profile-button">Back to Profile</button>
        </Link>
      </div>
    </div>
  );
}
