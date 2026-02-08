(() => {
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      value: undefined,
      configurable: true,
      writable: true,
    });
  } catch (error) {
    console.warn('Could not override localStorage for tests:', error);
  }
})();
