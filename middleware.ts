import { NextRequest, NextResponse } from 'next/server';
import { isTokenExpired } from 'pocketbase';
import Pocketbase from 'pocketbase';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('pb_auth');

    const pathname = request.nextUrl.pathname.replace('/dashboard', '');

    if (!(authCookie?.value) || isTokenExpired(authCookie?.value)) {
      const url = request.nextUrl.clone();
      url.pathname = `/login`;
      if (request.nextUrl.pathname.startsWith('/dashboard/')) url.searchParams.set('continue', pathname);
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard/admin') || request.nextUrl.pathname.startsWith('/dashboard/view')) {
    const pb = new Pocketbase('http://colegiosatelite.zapto.org:81');
    pb.authStore.loadFromCookie(request.cookies.get('pb_auth')!.value);

    if (!(pb.authStore.record?.admin)) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  if (request.nextUrl.pathname === ('/')) {
    const authCookie = request.cookies.get('pb_auth');

    if (authCookie?.value && !isTokenExpired(authCookie?.value!)) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    } else {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}