'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <p style={{ fontSize: '4rem', fontWeight: 'bold', color: '#ef4444' }}>
            !
          </p>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginTop: '1rem',
            }}
          >
            Terjadi Kesalahan
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Aplikasi mengalami error yang tidak terduga.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}
