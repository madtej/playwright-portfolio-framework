/**
 * Small, dependency-free helpers used across specs.
 * Keeping these out of test files keeps specs readable.
 */

export function randomEmail(): string {
  return `qa.user.${Date.now()}@example.com`;
}

export function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

export function isSortedAscending(numbers: number[]): boolean {
  return numbers.every((val, i) => i === 0 || numbers[i - 1] <= val);
}

export function isSortedDescending(numbers: number[]): boolean {
  return numbers.every((val, i) => i === 0 || numbers[i - 1] >= val);
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
