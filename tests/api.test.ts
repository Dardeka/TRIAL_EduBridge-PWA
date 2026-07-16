import { describe, it, expect, beforeAll } from 'vitest';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

describe('API Health Check', () => {
  it('GET /api/health returns healthy status', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('services');
    expect(Array.isArray(body.services)).toBe(true);
  });
});

describe('API Materials', () => {
  it('GET /api/materials returns array', async () => {
    const res = await fetch(`${BASE_URL}/api/materials`);
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('GET /api/materials?subject=invalid returns empty or filtered', async () => {
    const res = await fetch(
      `${BASE_URL}/api/materials?subject=507f1f77bcf86cd799439011`
    );
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });
});

describe('API Subjects List', () => {
  it('GET /api/subjects-list returns array', async () => {
    const res = await fetch(`${BASE_URL}/api/subjects-list`);
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });
});

describe('API Kelas Subjects', () => {
  it('GET /api/kelas-subjects?level=SMP returns subjects', async () => {
    const res = await fetch(`${BASE_URL}/api/kelas-subjects?level=SMP`);
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('GET /api/kelas-subjects with invalid level returns 400', async () => {
    const res = await fetch(`${BASE_URL}/api/kelas-subjects?level=invalid`);
    expect(res.status).toBe(400);
  });
});

describe('API Protected Routes', () => {
  it('GET /api/admin/dashboard without auth returns 401', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/dashboard`);
    expect(res.status).toBe(401);
  });

  it('GET /api/admin/materials without auth returns 401', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/materials`);
    expect(res.status).toBe(401);
  });

  it('DELETE /api/admin/materials without auth returns 401', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/materials?id=test`, {
      method: 'DELETE',
    });
    expect(res.status).toBe(401);
  });
});

describe('API Security', () => {
  it('POST /api/quiz-submit without body returns error', async () => {
    const res = await fetch(`${BASE_URL}/api/quiz-submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.ok).toBe(false);
  });

  it('GET /api/materials/invalid-id returns 400', async () => {
    const res = await fetch(`${BASE_URL}/api/materials/not-a-valid-id`);
    expect(res.status).toBe(400);
  });
});
