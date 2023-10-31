import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';
import CookieBanner from './CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | Pna Academy', template: '%s | Pna Academy' },
  description:
    'Home page describing why you should join the academy and giving options towards it ',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en">
      <body className={inter.className}>
        <CookieBanner />
        <nav>
          <div>
            <Link href="/">HOME</Link>
            <Link href="/services">SERVICES</Link>
            <Link href="/about">ABOUT</Link>
          </div>

          <div>
            {user ? (
              <>
                <div>{user.username}</div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
              </>
            )}
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
