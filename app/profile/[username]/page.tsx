import './profile.scss';
import { saveAs } from 'file-saver';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserServices } from '../../../database/services';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByUsername } from '../../../database/users';
import DownloadButton from './DownloadButton';

type Props = {
  params: { username: string };
};
export const metadata = {
  title: { default: 'Profile', template: '%s' },
  description: 'User Profile information',
};

export default async function UserProfilePage({ params }: Props) {
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // Assuming singleUser.id contains the user's ID

  //  Query your database to check if this user is admin

  // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) redirect('/login?returnTo=/');
  const singleUser = await getUserByUsername(params.username);
  if (!singleUser) redirect('/');
  const userServices = await getUserServices();

  return (
    <div className="profile-container">
      <h1 className="profile-title">{singleUser.username}'s Profile</h1>
      <div className="profile-content">
        <section className="profile-section">
          <h2 className="section-title">Personal Data</h2>
          <p>
            <strong>Name:</strong> {singleUser.firstName} {singleUser.lastName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {singleUser.dateOfBirth}
          </p>
          <p>
            <strong>Gender:</strong> {singleUser.gender}
          </p>
        </section>
      </div>
      <section className="profile-section">
        <h2 className="section-title">Contact Information</h2>
        <p>
          <strong>Email:</strong> {singleUser.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {singleUser.phoneNumber}
        </p>
      </section>

      <section className="active-service">
        {singleUser && singleUser.secureUrl ? (
          <>
            <p>Your service is active.</p>
            <DownloadButton
              secureUrl={singleUser.secureUrl}
              fileName="active-service"
            />
          </>
        ) : (
          <>
            <div className="not-active">
              <p>You have no active service. Get in shape</p>
            </div>
            <div className="service-link">
              <button className="now">
                <Link href="/services">NOW</Link>
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
