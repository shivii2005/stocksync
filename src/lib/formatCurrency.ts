export function formatINR(value: number): string {
  if (value < 100000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${(value / 100000).toFixed(1)}L`;
}
