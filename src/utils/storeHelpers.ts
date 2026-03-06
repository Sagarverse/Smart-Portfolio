// Utility for persisting and hydrating Zustand stores
/**
 * Wrap Zustand store to add persistence capabilities
 */
export function withPersistence<T extends Record<string, any>>(
  key: string,
  initialState?: Partial<T>
) {
  const persistedState = initialState || {};

  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored) {
        Object.assign(persistedState, JSON.parse(stored));
      }
    }
  } catch (error) {
    console.error(`Failed to hydrate state from ${key}:`, error);
  }

  return persistedState;
}

/**
 * Save state to localStorage
 */
export function persistState<T>(key: string, state: T) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state));
    }
  } catch (error) {
    console.error(`Failed to persist state to ${key}:`, error);
  }
}

/**
 * Load state from localStorage
 */
export function loadPersistedState<T>(key: string): T | null {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    }
  } catch (error) {
    console.error(`Failed to load persisted state from ${key}:`, error);
  }
  return null;
}

/**
 * Clear persisted state
 */
export function clearPersistedState(key: string) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Failed to clear persisted state for ${key}:`, error);
  }
}
