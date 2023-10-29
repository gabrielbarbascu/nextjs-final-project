import './globals.scss';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from './(auth)/logout/LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Home page | Pna Academy', template: '%s | Pna Academy' },
  description:
    'Home page describing why you should join the academy and giving options towards it ',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <div>
            <Link href="/">HOME</Link>
            <Link href="/services">SERVICES</Link>
            <Link href="/about">ABOUT</Link>
          </div>

          <div>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
            <LogoutButton />
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
