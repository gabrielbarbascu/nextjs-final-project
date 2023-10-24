import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';

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
            <Link href="/account">SIGN UP/LOG IN</Link>
          </div>
        </nav>

        {props.children}
      </body>
    </html>
  );
}
