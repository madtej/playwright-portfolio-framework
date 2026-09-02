import { test, expect } from '../../fixtures/pageFixtures';
import { users, invalidUser } from '../../data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in successfully with valid standard user @smoke', async ({ loginPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('rejects an invalid username/password combination @regression', async ({ loginPage }) => {
    await loginPage.login(invalidUser.username, invalidUser.password);
    const error = await loginPage.getErrorText();
    expect(error).toContain('Username and password do not match');
  });

  test('blocks a locked-out user with a clear error message @regression', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    const error = await loginPage.getErrorText();
    expect(error).toContain('locked out');
  });

  test('requires both username and password @regression', async ({ loginPage }) => {
    await loginPage.login('', '');
    const error = await loginPage.getErrorText();
    expect(error).toContain('Username is required');
  });
});
