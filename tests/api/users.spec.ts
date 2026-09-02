import { test, expect } from '@playwright/test';

/**
 * API-level tests hitting a public REST test API (reqres.in).
 * Demonstrates that this framework isn't limited to UI automation -
 * the same Playwright test runner drives API contract checks too.
 */
test.describe('Users API', () => {
  test('GET /users/2 returns a single user with expected shape @smoke', async ({ request }) => {
    const response = await request.get('/users/2');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.data).toMatchObject({
      id: 2,
      email: expect.stringContaining('@'),
      first_name: expect.any(String),
      last_name: expect.any(String),
    });
  });

  test('GET /users?page=2 returns a paginated list @regression', async ({ request }) => {
    const response = await request.get('/users?page=2');
    const body = await response.json();

    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('POST /users creates a user and echoes submitted fields @regression', async ({
    request,
  }) => {
    const payload = { name: 'QA Engineer', job: 'SDET' };
    const response = await request.post('/users', { data: payload });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.id).toBeDefined();
  });

  test('DELETE /users/2 returns 204 No Content @regression', async ({ request }) => {
    const response = await request.delete('/users/2');
    expect(response.status()).toBe(204);
  });

  test('GET /users/23 returns 404 for a non-existent user @edge-case', async ({ request }) => {
    const response = await request.get('/users/23');
    expect(response.status()).toBe(404);
  });
});
