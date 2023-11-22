import './layout.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import Avatar from '../public/avatar.png';
import Logo from '../public/icon-192.png';
import LogoutButton from './(auth)/logout/LogoutButton';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: { default: 'Home page | PNA Academy', template: '%s | PNA Academy' },
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
        <nav>
          <div className="left-side">
            <Link href={'/'}>
              <div>
                <Image
                  src={Logo}
                  alt={'Pna Academy Logo'}
                  width={50}
                  height={50}
                />
              </div>
            </Link>
            <Link href={'/'} className="user-name">
              ALEX POPA
            </Link>
          </div>

          <div className="right-side">
            <Link href="/services" className="text-white">
              SERVICES
            </Link>
            <Link href="/about" className="text-white">
              ABOUT
            </Link>

            {user ? (
              <>
                <Link href={`/profile/${user.username}`} className="text-white">
                  <div>
                    <Image
                      src={Avatar}
                      alt={`${user.username}'s profile`}
                      width="40"
                      height="40"
                    />
                  </div>
                </Link>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register" className="text-white">
                  REGISTER
                </Link>
                <Link href="/login" className="text-white">
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
