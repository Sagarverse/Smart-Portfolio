// Keyboard shortcuts utility
export function registerShortcut(key: string, callback: () => void) {
  function handler(e: KeyboardEvent) {
    if (e.key === key && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      callback();
    }
  }
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}
