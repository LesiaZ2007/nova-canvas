import { useEffect, useState, useCallback } from 'react';
import { getSettings, settingsStore, resolveTokens, DEFAULT_SETTINGS, type NovaSettings } from './settings';
import type { ThemeTokens } from './tokens';

/** React hook: live settings, resolved tokens, and writers back to chrome.storage. */
export function useSettings() {
  const [settings, setSettings] = useState<NovaSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    getSettings().then((s) => {
      if (active) {
        setSettings(s);
        setLoaded(true);
      }
    });
    const unwatch = settingsStore.watch((next) => next && setSettings(next));
    return () => {
      active = false;
      unwatch();
    };
  }, []);

  const patch = useCallback(
    (p: Partial<NovaSettings>) => {
      setSettings((cur) => {
        const next = { ...cur, ...p };
        settingsStore.setValue(next);
        return next;
      });
    },
    [],
  );

  /** Override a single design token (writes into settings.overrides). */
  const setToken = useCallback(<K extends keyof ThemeTokens>(key: K, value: ThemeTokens[K]) => {
    setSettings((cur) => {
      const next = { ...cur, overrides: { ...cur.overrides, [key]: value } };
      settingsStore.setValue(next);
      return next;
    });
  }, []);

  const tokens = resolveTokens(settings);
  return { settings, tokens, patch, setToken, loaded };
}
