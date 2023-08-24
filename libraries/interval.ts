export function doEvery<T extends () => unknown>({
  condition,
  callback,
  intervalMs = 300,
}: {
  condition: () => boolean;
  callback: T;
  intervalMs?: number;
}) {
  let timeoutId: NodeJS.Timeout;

  const doNext = () => {
    if (condition()) callback();
    timeoutId = setTimeout(doNext, intervalMs);
  };

  doNext();

  return { cancel: () => clearTimeout(timeoutId) };
}
