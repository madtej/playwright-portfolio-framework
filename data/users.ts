/**
 * Centralised test data for SauceDemo's published test accounts.
 * Keeping credentials here (not hardcoded in specs) means a single
 * update propagates to every test that needs it.
 */
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

export const invalidUser = { username: 'invalid_user', password: 'wrong_password' };
