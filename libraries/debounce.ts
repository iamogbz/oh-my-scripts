export function debounce(fn: (...args: unknown[]) => unknown, wait: number) {
  let timeoutId: NodeJS.Timeout;
  return function debounced(...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      fn(...args);
    }, wait);
  };
}
