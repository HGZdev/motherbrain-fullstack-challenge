export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number = 500
) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: unknown[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Format a number as money
 * @param amount
 * @param shorterUnits
 * @returns
 */
export const formatMoney = (amount: number, shorterUnits?: boolean) => {
  const sign = shorterUnits ? "k" : "";

  return (
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      currency: "EUR",
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(shorterUnits ? amount / 1000 : amount) + sign
  );
};
