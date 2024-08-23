import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(req) {
    if (
        req.nextUrl.pathname.startsWith('/CreateUser') &&
        req.nextauth?.token?.role != 'ADMIN'
    ) {
        return NextResponse.rewrite(new URL('/Denied', req.url));
    }
});

export const config = { matcher: ['/CreateUser'] };

// To block whole site
// export { default } from 'next-auth/middleware';
