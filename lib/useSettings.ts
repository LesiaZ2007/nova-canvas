import { useEffect, useState, useCallback } from 'react';
import { getSettings, settingsStore, DEFAULT_SETTINGS, type NovaSettings } from './settings';

/** React hook: live settings + a patch() that writes back to chrome.storage. */
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
      const next = { ...settings, ...p };
      setSettings(next); // optimistic
      return settingsStore.setValue(next);
    },
    [settings],
  );

  return { settings, patch, loaded };
}
