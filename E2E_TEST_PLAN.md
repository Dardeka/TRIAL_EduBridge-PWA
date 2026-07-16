# E2E Test Plan

## Setup

This project uses Playwright for E2E testing. Install with:

```bash
npm install -D @playwright/test
npx playwright install chromium
```

## Test Flow: Full User Journey

### 1. Registration Flow

```typescript
test('register → dashboard', async ({ page }) => {
  await page.goto('/register');
  await page.fill('#name', 'Test Siswa');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'testpass123');
  await page.selectOption('#education-level', 'SMP');
  await page.check('#terms');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
});
```

### 2. Browse Materials

```typescript
test('browse materi → filter by subject', async ({ page }) => {
  await page.goto('/materi');
  await page.waitForSelector('[data-testid="material-card"]');
  const cards = await page.locator('[data-testid="material-card"]').count();
  expect(cards).toBeGreaterThan(0);
});
```

### 3. Take Quiz

```typescript
test('material → quiz → submit', async ({ page }) => {
  await page.goto('/materi');
  await page.click('[data-testid="material-card"]:first-child');
  await page.click('text=Mulai Kuis');
  await page.waitForURL(/\\/quiz\\//);
  // Answer questions...
  await page.click('text=Selesai');
  await page.waitForSelector('text=Skor Anda');
});
```

### 4. Profile & Certificate

```typescript
test('profile shows user data', async ({ page }) => {
  await page.goto('/profile');
  await page.waitForSelector('text=Test Siswa');
  await page.waitForSelector('text=SMP');
});
```

### 5. Admin Flow

```typescript
test('admin: login → dashboard → upload', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'admin@edubridge.com');
  await page.fill('#password', 'adminpass');
  await page.click('button[type="submit"]');
  await page.goto('/admin');
  await page.waitForSelector('text=Total Siswa');
});
```

## Running Tests

```bash
# Unit/API tests
npm run test

# E2E tests
npx playwright test

# E2E with UI
npx playwright test --ui
```
