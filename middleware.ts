import { NextRequest, NextResponse } from 'next/server';

export const config = {
  //  modify matcher for what need to be protected,it can be also an aray ['','']
  matcher: '/animal-management-naive-dont-copy/:path*',
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
