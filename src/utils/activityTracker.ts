// Activity tracking utility
let activityTimeout: NodeJS.Timeout | null = null;

export function trackActivity(onActive: () => void, onIdle: () => void, idleMs = 60000) {
  function reset() {
    if (activityTimeout) clearTimeout(activityTimeout);
    onActive();
    activityTimeout = setTimeout(onIdle, idleMs);
  }
  window.addEventListener('mousemove', reset);
  window.addEventListener('keydown', reset);
  window.addEventListener('scroll', reset);
  reset();
  return () => {
    window.removeEventListener('mousemove', reset);
    window.removeEventListener('keydown', reset);
    window.removeEventListener('scroll', reset);
    if (activityTimeout) clearTimeout(activityTimeout);
  };
}
