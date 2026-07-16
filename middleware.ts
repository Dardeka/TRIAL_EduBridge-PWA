import { NextResponse, type NextRequest } from 'next/server';

// Note: For production rate-limiting on Vercel, use Upstash Redis or Vercel's
// built-in WAF. In-memory Maps do not share state across serverless instances.

const SECURITY_HEADERS: Record<string, string> = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    if (request.method !== 'GET' && request.method !== 'OPTIONS') {
      const origin = request.headers.get('origin');
      const host = request.headers.get('host');
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      if (origin && host && appUrl) {
        try {
          const originUrl = new URL(origin);
          const appUrlParsed = new URL(appUrl);
          if (originUrl.hostname !== appUrlParsed.hostname) {
            return NextResponse.json(
              { error: 'CSRF validation failed' },
              { status: 403 }
            );
          }
        } catch {
          return NextResponse.json(
            { error: 'Invalid origin' },
            { status: 403 }
          );
        }
      }
    }

    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
    }

    const response = NextResponse.next();
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  const response = NextResponse.next();
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json|icon-.*\\.svg|apple-touch-icon\\.svg).*)',
  ],
};
