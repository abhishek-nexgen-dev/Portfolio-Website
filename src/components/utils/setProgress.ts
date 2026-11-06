export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  // Ultra-fast responsive progress so recruiters/visitors are never kept waiting
  const interval = setInterval(() => {
    if (percent < 100) {
      const step = Math.round(Math.random() * 18) + 12;
      percent = Math.min(100, percent + step);
      setLoading(percent);
      if (percent >= 100) {
        clearInterval(interval);
      }
    } else {
      clearInterval(interval);
    }
  }, 25);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      setLoading(100);
      resolve(100);
    });
  }
  return { loaded, percent, clear };
};
