const VND_GROUP_FORMATTER = new Intl.NumberFormat('vi-VN', {
  maximumFractionDigits: 0,
});

export function formatVNDInput(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits ? VND_GROUP_FORMATTER.format(Number(digits)) : '';
}

export function parseVNDInput(value: string): number | undefined {
  const digits = value.replace(/\D/g, '');
  if (!digits) return undefined;

  const amount = Number(digits);
  return Number.isSafeInteger(amount) ? amount : undefined;
}
